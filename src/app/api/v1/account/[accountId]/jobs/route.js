import connectDB from '@db/connectDB'
import CompanyAccount from '@db/models/account'
import Job from '@db/models/job'
import Customer from '@db/models/customer'
import createJobEstimatePDF from '@lib/helpers/pdf/createJobEstimatePDF'
import fs from 'fs'
import path from 'path'

const getJobsInAccount = async (req, { params }) =>
{
  const { accountId } = params
  const startDate = req.nextUrl.searchParams.get('startDate')
  const endDate = req.nextUrl.searchParams.get('endDate')

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId).populate('jobs')

    if (!account) throw new Error('Account not found')

    let jobs = account.jobs

    // If startDate and endDate are provided, filter jobs by dateOfMove
    if (startDate && endDate)
    {
      const start = new Date(startDate)
      const end = new Date(endDate)

      jobs = jobs.filter((job) =>
      {
        const dateOfMove = new Date(job.dateOfMove)
        return dateOfMove >= start && dateOfMove <= end
      })
    }

    return Response.json({ success: jobs }, { status: 200 })
  } catch (error)
  {
    console.error('Error fetching jobs:', error) // Debug log
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const createJobInAccount = async (req, { params }) =>
{
  const { newJobData, userId } = await req.json()
  const { accountId } = params

  console.log('New Job Data: ', newJobData)
  console.log('User ID: ', userId)
  console.log('Account ID: ', accountId)

  try
  {
    await connectDB()

    // Validate the required fields
    if (!accountId || !newJobData.customer || !newJobData.jobDetails)
    {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Handle customer creation or retrieval
    let customer

    if (newJobData.isReturnCustomer)
    {
      customer = await Customer.findById(newJobData.customer.returnCustomerId)

      if (!customer)
      {
        return Response.json({ error: 'Customer not found' }, { status: 404 })
      }
    } else
    {
      customer = await Customer.create({
        account: accountId,
        firstname: newJobData.customer.firstname ?? '',
        lastname: newJobData.customer.lastname ?? '',
        email: newJobData.customer.email ?? '',
        phone: newJobData.customer.phoneNumber ?? '',
        address1: newJobData.customer.address1 ?? '',
        address2: newJobData.customer.address2 ?? '',
        city: newJobData.customer.city ?? '',
        state: newJobData.customer.state ?? '',
        zip: newJobData.customer.zip ?? '',
      })

      await customer.save()
    }

    // Create the job
    const job = await Job.create({
      account: accountId,
      customer: customer._id,
      title: newJobData.jobDetails.jobTitle ?? '',
      serviceType: newJobData.jobDetails.serviceType ?? '',
      description: newJobData.jobDetails.jobDescription ?? '',
      address: newJobData.jobDetails.differentAddress ? {
        address1: newJobData.jobDetails.serviceLocation.address1 ?? '',
        address2: newJobData.jobDetails.serviceLocation.address2 ?? '',
        city: newJobData.jobDetails.serviceLocation.city ?? '',
        state: newJobData.jobDetails.serviceLocation.state ?? '',
        zip: newJobData.jobDetails.serviceLocation.zip ?? '',
      } : {
        address1: newJobData.customer.address1 ?? '',
        address2: newJobData.customer.address2 ?? '',
        city: newJobData.customer.city ?? '',
        state: newJobData.customer.state ?? '',
        zip: newJobData.customer.zip ?? '',
      },
      dateOfJob: new Date(`${ newJobData.jobDetails.scheduledDate ?? '' }T${ newJobData.jobDetails.scheduledTime ?? '' }`),
      isBooked: true,
      notes: newJobData.jobDetails.customerInstructions ? [ {
        text: newJobData.jobDetails.customerInstructions,
        owner: userId
      } ] : [],
      safetyConcerns: newJobData.jobDetails.safetyConcerns ?? '',
      serviceItemsandMaterials: {
        items: newJobData.jobDetails.serviceItems ?? '',
        materials: newJobData.jobDetails.materialsNeeded ?? '',
      },
      pricing: {
        type: newJobData.jobDetails.pricingType ?? '',
        estimatedPrice: newJobData.jobDetails.estimatedPrice ?? 0,
      },
      customerServices: newJobData.jobDetails.customServices ?? '',
      photos: [],
    })

    // Create directories if they do not exist
    const imgDir = path.join(process.cwd(), 'public', 'uploads', accountId, 'jobs', job._id, 'images')
    const jobDir = path.join(process.cwd(), 'public', 'uploads', accountId, 'jobs', job._id, 'json')

    fs.mkdirSync(imgDir, { recursive: true })
    fs.mkdirSync(jobDir, { recursive: true })

    // Save the job data as a JSON file
    const newJobDataPath = path.join(jobDir, 'job_data.json')
    fs.writeFileSync(newJobDataPath, JSON.stringify(newJobData, null, 2))

    // Save attachments to the job folder if exists
    if (newJobData.jobDetails.attachments && newJobData.jobDetails.attachments.length > 0)
    {
      newJobData.jobDetails.attachments.forEach((attachment) =>
      {
        const attachmentPath = path.join(imgDir, attachment.name)
        fs.writeFileSync(attachmentPath, attachment.data, 'base64')

        // Add the attachment to the job
        job.photos.push({
          url: `/uploads/${ accountId }/jobs/${ job._id }/images/${ attachment.name }`,
          createdAt: new Date(Date.now()),
        })
      })

      // Save the job with the attachments
      await job.save()
    }

    // Create the job estimate PDF
    const pdfUrl = await createJobEstimatePDF(newJobData, accountId, job._id)

    // Update the job with the PDF URL
    job.documents.push({
      name: 'Estimate',
      url: pdfUrl,
    })

    await job.save()

    return Response.json(
      { success: 'Job created successfully', data: job },
      { status: 201 }
    )
  } catch (error)
  {
    console.error('Error creating job:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


export { getJobsInAccount as GET, createJobInAccount as POST }
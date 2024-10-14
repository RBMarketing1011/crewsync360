import connectDB from '@db/connectDB'
import CompanyAccount from '@db/models/account'
import Job from '@db/models/job'
import Customer from '@db/models/customer'

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
  const { accountId } = params
  const {
    customerId, movingFromAddress, movingToAddress,
    dateOfMove, numberOfMovers, notes
  } = await req.json()

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId)
    const customer = await Customer.findById(customerId)

    if (!account || !customer) throw new Error('Account or Customer not found')

    const job = await Job.create({
      account: account._id,
      customer: customer._id,
      movingFromAddress,
      movingToAddress,
      dateOfMove,
      numberOfMovers,
      notes,
      assignedEmployees: [],
      inventory: [],
      packingMaterials: [],
      documents: [],
      photos: [],
    })

    account.jobs.push(job)
    await account.save()

    return Response.json({ message: 'Job created' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { getJobsInAccount as GET, createJobInAccount as POST }
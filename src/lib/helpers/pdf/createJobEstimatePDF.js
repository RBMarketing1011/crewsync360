import { PDFDocument, rgb } from 'pdf-lib'
import fs from 'fs'
import path from 'path'

const createJobEstimatePDF = async (newJobData, accountId, jobId) =>
{
  // Create a new PDF Document
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([ 600, 800 ])

  // Set some default styles
  const { width, height } = page.getSize()
  const fontSize = 14

  // Title
  page.drawText('Job Estimate', {
    x: 50,
    y: height - 50,
    size: 18,
    color: rgb(0, 0.53, 0.71),
  })

  // Customer Information
  let yOffset = height - 100
  page.drawText('Customer Information:', {
    x: 50,
    y: yOffset,
    size: fontSize,
    color: rgb(0, 0, 0),
  })
  yOffset -= 20

  const customerFields = [
    `Name: ${ newJobData.customer.firstname } ${ newJobData.customer.lastname }`,
    `Email: ${ newJobData.customer.email }`,
    `Phone: ${ newJobData.customer.phoneNumber }`,
    `Address: ${ newJobData.customer.address1 } ${ newJobData.customer.address2 }, ${ newJobData.customer.city }, ${ newJobData.customer.state } ${ newJobData.customer.zip }`,
  ]

  customerFields.forEach((field) =>
  {
    page.drawText(field, {
      x: 50,
      y: yOffset,
      size: fontSize,
    })
    yOffset -= 20
  })

  // Job Details
  yOffset -= 10
  page.drawText('Job Details:', {
    x: 50,
    y: yOffset,
    size: fontSize,
    color: rgb(0, 0, 0),
  })
  yOffset -= 20

  const jobDetailsFields = [
    `Job Title: ${ newJobData.jobDetails.jobTitle }`,
    `Service Type: ${ newJobData.jobDetails.serviceType }`,
    `Description: ${ newJobData.jobDetails.jobDescription }`,
    `Scheduled Date: ${ newJobData.jobDetails.scheduledDate }`,
    `Scheduled Time: ${ newJobData.jobDetails.scheduledTime }`,
    `Pricing Type: ${ newJobData.jobDetails.pricingType }`,
    `Estimated Price: $${ newJobData.jobDetails.estimatedPrice }`,
    `Safety Concerns: ${ newJobData.jobDetails.safetyConcerns }`,
    `Customer Instructions: ${ newJobData.jobDetails.customerInstructions }`,
  ]

  jobDetailsFields.forEach((field) =>
  {
    page.drawText(field, {
      x: 50,
      y: yOffset,
      size: fontSize,
    })
    yOffset -= 20
  })

  // Save the PDF to the specified directory
  const pdfBytes = await pdfDoc.save()
  const filePath = path.join(process.cwd(), 'public', 'uploads', accountId, 'jobs', jobId, 'estimate', 'job_estimate.pdf')

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true })

  // Write the PDF to the directory
  fs.writeFileSync(filePath, pdfBytes)

  console.log('PDF saved to', filePath)

  return filePath
}

export default createJobEstimatePDF

// Usage Example:
// createJobEstimatePDF({
//   isReturnCustomer: false,
//   customer: {
//     returnCustomerId: "",
//     firstname: "John",
//     lastname: "Doe",
//     email: "john.doe@example.com",
//     phoneNumber: "123-456-7890",
//     address1: "123 Main St",
//     address2: "",
//     city: "Anytown",
//     state: "CA",
//     zip: "12345",
//   },
//   jobDetails: {
//     jobTitle: "Plumbing Repair",
//     serviceType: "Plumbing",
//     jobDescription: "Fix leaky faucet in the kitchen",
//     scheduledDate: "2024-10-20",
//     scheduledTime: "10:00 AM",
//     differentAddress: false,
//     serviceLocation: {
//       address1: "",
//       address2: "",
//       city: "",
//       state: "",
//       zip: "",
//     },
//     serviceItems: "Faucet, Pipe",
//     materialsNeeded: "Copper pipe, faucet washers",
//     pricingType: "Flat Rate",
//     estimatedPrice: "150",
//     safetyConcerns: "Ensure water supply is turned off before starting work",
//     customerInstructions: "Call before arriving",
//     customServices: "Follow-up maintenance",
//     attachments: [],
//   },
// }, 'accountId', 'jobId');
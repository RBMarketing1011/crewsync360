'use client'

import { createContext, useState } from 'react'

const JobContext = createContext()

const JobProvider = ({ children }) =>
{
  // All state for creating new job
  const [ currentStep, setCurrentStep ] = useState(2)
  const [ animationClass, setAnimationClass ] = useState('')

  // const [ newJobData, setNewJobData ] = useState({
  //   isReturnCustomer: false, // Toggle for new or returning customer
  //   customer: {
  //     returnCustomerId: "",
  //     firstname: "",
  //     lastname: "",
  //     email: "",
  //     phoneNumber: "",
  //     address1: "",
  //     address2: "",
  //     city: "",
  //     state: "",
  //     zip: ""
  //   },
  //   jobDetails: {
  //     jobTitle: "",
  //     serviceType: "",
  //     jobDescription: "",
  //     scheduledDate: "",
  //     scheduledTime: "",
  //     differentAddress: false, // Toggle for using a different address than the customer's
  //     serviceLocation: {
  //       address1: "",
  //       address2: "",
  //       city: "",
  //       state: "",
  //       zip: ""
  //     },
  //     serviceItems: "",
  //     materialsNeeded: "",
  //     pricingType: "",
  //     estimatedPrice: "",
  //     safetyConcerns: "",
  //     customerInstructions: "",
  //     customServices: "",
  //     attachments: [] // List of file URLs or file data
  //   }
  // })

  const [ newJobData, setNewJobData ] = useState({
    "isReturnCustomer": true,
    "customer": {
      "returnCustomerId": "6715739890c6f84ab05efcd2",
      "firstname": "Josh",
      "lastname": "Numnuts",
      "email": "info@rbmarketingandanalytics.com",
      "phoneNumber": "678-854-8569",
      "address1": "3235 Satellite Blvd",
      "address2": "",
      "city": "Duluth",
      "state": "GA",
      "zip": "30096"
    },
    "jobDetails": {
      "jobTitle": "Build walkway",
      "serviceType": "Landscaping",
      "jobDescription": "This is a test for json data",
      "scheduledDate": "2024-10-30",
      "scheduledTime": "08:50",
      "differentAddress": false,
      "serviceLocation": {
        "address1": "",
        "address2": "",
        "city": "",
        "state": "",
        "zip": ""
      },
      "serviceItems": "Build walkway",
      "materialsNeeded": "A bunch of stuff",
      "pricingType": "Flat Rate",
      "estimatedPrice": "6529",
      "safetyConcerns": "Dog in back yard",
      "customerInstructions": "These are notes taking during creation time",
      "customServices": "Clean black mark on back patio",
      "attachments": [
        "blob:http://localhost:3000/66fc221c-47a4-4bb8-8882-8538ba3227df",
        "blob:http://localhost:3000/cd6d0b1a-cc98-4bc3-b912-66a86aef5687",
        "blob:http://localhost:3000/bd68fff3-4bf5-4091-80bb-a81eed229647",
        "blob:http://localhost:3000/82c952ba-4f28-49cf-bbbb-4e906568cb70",
        "blob:http://localhost:3000/3088a1d9-4540-4283-ad0b-df372c1df8c4",
        "blob:http://localhost:3000/941d40ac-33b6-4b12-8398-647e6c2e52d2",
        "blob:http://localhost:3000/fc743e24-8f33-48b0-a05b-32b136b9c84f",
        "blob:http://localhost:3000/b8c7e5fe-fcdd-4501-9138-82c43040ef7e",
        "blob:http://localhost:3000/0cbefcc9-376d-4462-8e57-941a7be603eb"
      ]
    }
  })

  const [ errors, setErrors ] = useState([])

  return (
    <JobContext.Provider value={ {
      newJobState: [ newJobData, setNewJobData ],
      stepState: [ currentStep, setCurrentStep ],
      animationState: [ animationClass, setAnimationClass ],
      errorsState: [ errors, setErrors ]
    } }>

      { children }

    </JobContext.Provider>
  )
}

export { JobContext, JobProvider }
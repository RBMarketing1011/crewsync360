'use client'

import { useContext } from 'react'
import { JobContext } from '@providers/context/JobProvider'
import { MiscContext } from '@providers/context/MiscProvider'
import CustomerInfo from '@components/molecule/newJob/CustomerInfo'
import JobDetails from '@components/molecule/newJob/JobDetails'
import ReviewDetails from '@components/molecule/newJob/ReviewDetails'
import NewJobProgressBar from '@components/molecule/newJob/NewJobProgressBar'
import { formatPhoneNumber } from '@lib/helpers/formatPhoneNum'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import BtnLoader from '@components/atom/BtnLoader'

const NewJobPage = () =>
{
  const { newJobState, stepState, animationState, errorsState } = useContext(JobContext)
  const [ newJobData, setNewJobData ] = newJobState
  const [ currentStep, setCurrentStep ] = stepState
  const [ animationClass, setAnimationClass ] = animationState
  const [ errors, setErrors ] = errorsState

  const { loadingState } = useContext(MiscContext)
  const [ loading, setLoading ] = loadingState

  const { data: session } = useSession()

  const validateCustomerData = (newJobData) =>
  {
    const missingFields = []
    const customerData = newJobData.customer || {}

    for (const [ key, value ] of Object.entries(customerData))
    {
      const param = !value && key !== 'returnCustomerId' && key !== 'address2'

      if (param)
      {
        missingFields.push(key)
      }

      if (key === 'email' && value)
      {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

        if (!emailPattern.test(value))
        {
          missingFields.push(key)
        }
      }

      if (key === 'phoneNumber' && value)
      {
        const phonePattern = /^\+1[0-9]{10}$/
        const format = formatPhoneNumber(value)

        if (!phonePattern.test(format))
        {
          missingFields.push(key)
        }
      }
    }

    setErrors((prevErrors) => [ ...prevErrors, ...missingFields ])
    return missingFields
  }

  const validateJobDetailsData = (newJobData) =>
  {
    const missingFields = []
    const jobDetailsData = newJobData.jobDetails || {}

    for (const [ key, value ] of Object.entries(jobDetailsData))
    {
      const notRequired = [
        'differentAddress', 'pricingType', 'estimatedPrice', 'safetyConcerns',
        'customerInstructions', 'customServices', 'attachments'
      ].includes(key)

      if (!value && !notRequired)
      {
        missingFields.push(key)
      }

      if (newJobData.jobDetails.differentAddress)
      {
        const serviceLocation = newJobData.jobDetails.serviceLocation || {}

        for (const [ key, value ] of Object.entries(serviceLocation))
        {
          if (!value)
          {
            missingFields.push(key)
          }
        }
      }
    }

    setErrors((prevErrors) => [ ...prevErrors, ...missingFields ])
    return missingFields
  }

  const handleContinue = async () =>
  {
    if (currentStep === 0)
    {
      const errors = validateCustomerData(newJobData)

      if (errors.length > 0) return
    }

    if (currentStep === 1)
    {
      const errors = validateJobDetailsData(newJobData)

      if (errors.length > 0) return
    }

    if (currentStep === 2)
    {
      // Submit the form data
      setLoading(true)
      try
      {
        const userId = session?.user?._id
        const req = await fetch(`/api/v1/account/${ session?.account?._id }/jobs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ newJobData, userId })
        })

        console.log(req)

        if (!req.ok)
        {
          setLoading(false)
          throw new Error('Failed to submit job data')
        }

        const res = await req.json()

        if (res.success)
        {
          setLoading(false)
          toast.success('Job submitted successfully')
          restartNewJob()
          console.log(res.data)
        }
      } catch (error)
      {
        console.error(error)
        toast.error(error.message)
        return
      }
    }

    setAnimationClass('animate-slideOutLeft') // Set animation class for the current component
    setTimeout(() =>
    {
      setCurrentStep((prevStep) => prevStep + 1)
      setAnimationClass('animate-slideInRight') // Set animation class for the new component
    }, 500) // Duration should match the CSS animation duration
  }

  const restartNewJob = () =>
  {
    setNewJobData({
      isReturnCustomer: false, // Toggle for new or returning customer
      customer: {
        returnCustomerId: "",
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: ""
      },
      jobDetails: {
        jobTitle: "",
        serviceType: "",
        jobDescription: "",
        scheduledDate: "",
        scheduledTime: "",
        differentAddress: false, // Toggle for using a different address than the customer's
        serviceLocation: {
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: ""
        },
        serviceItems: "",
        materialsNeeded: "",
        pricingType: "",
        estimatedPrice: "",
        safetyConcerns: "",
        customerInstructions: "",
        customServices: "",
        attachments: [] // List of file URLs or file data
      }
    })

    setErrors([])

    setCurrentStep(0)
  }

  return (
    <main className='w-full overflow-x-hidden sm:overflow-x-hidden'>
      <NewJobProgressBar currentStep={ currentStep } />
      <div
        className={ `w-full h-full sm:h-[68vh] flex sm:justify-center sm:items-start my-5 pt-5 sm:pt-12 sm:mb-0 transition-all ${ animationClass } overflow-x-hidden` }
        key={ currentStep }
      >
        {
          currentStep === 0 &&
          <CustomerInfo />
        }
        {
          currentStep === 1 &&
          <JobDetails
            newJobData={ newJobData }
            setNewJobData={ setNewJobData }
            errors={ errors }
          />
        }
        {
          currentStep === 2 &&
          <ReviewDetails
            newJobData={ newJobData }
            setCurrentStep={ setCurrentStep }
          />
        }
      </div>

      <div className="w-full flex justify-center sm:justify-end items-center gap-3 fixed py-5 bottom-0 sm:bottom-20 left-0 sm:left-auto sm:right-12 z-100 px-8 sm:px-6 bg-white">
        <button
          type="button"
          data-autofocus
          className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100/60 sm:mt-0 sm:w-auto text-nowrap"
          onClick={ restartNewJob }
        >
          Restart
        </button>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 sm:w-auto text-nowrap"
          onClick={ handleContinue }
        >
          {
            loading ?
              <BtnLoader />

              :

              <span>Continue &rarr;</span>
          }
        </button>
      </div>
    </main>
  )
}

export default NewJobPage


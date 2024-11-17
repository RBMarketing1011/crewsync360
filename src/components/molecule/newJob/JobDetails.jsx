'use client'

import { useContext } from 'react'
import { JobContext } from '@providers/context/JobProvider'
import { states } from '@lib/helpers/defaultData'
import AddressInputComponent from '@components/atom/Google/GoogleAddressVerify'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

const JobDetails = () =>
{
  const { newJobState, errorsState } = useContext(JobContext)
  const [ newJobData, setNewJobData ] = newJobState
  const [ errors, setErrors ] = errorsState

  return (
    <div className="grid grid-cols-4 w-full md:w-2/3 2xl:w-2/5 sm:gap-x-5 gap-y-10 sm:gap-y-8 pb-24 sm:pb-36 sm:mb-0">
      <div className="relative col-span-full sm:col-span-2 w-full">
        <label
          htmlFor="job-title"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Job Title
        </label>
        <input
          id="job-title"
          name="job-title"
          type="text"
          placeholder="General Repair - Smith Residence"
          className={ `${ errors.includes('jobTitle') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
          value={ newJobData.jobDetails.jobTitle }
          onChange={ (e) =>
          {
            const newValue = e.target.value

            setNewJobData(prev => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                jobTitle: newValue
              }
            }))

            setErrors(prev =>
            {
              if (prev.includes('jobTitle'))
              {
                return prev.filter((error) => error !== 'jobTitle')
              }
              return prev
            })
          } }
        />
        {
          errors.includes('jobTitle') &&

          <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
            <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
          </div>
        }
      </div>

      <div className="relative col-span-full sm:col-span-2 w-full">
        <label
          htmlFor="service-type"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Service Type
        </label>
        <select
          id="service-type"
          name="service-type"
          value={ newJobData.jobDetails.serviceType || 'blank' }
          className={ `${ errors.includes('serviceType') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
          onChange={ (e) =>
          {
            const newValue = e.target.value

            setNewJobData(prev => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                serviceType: newValue
              }
            }))

            setErrors(prev =>
            {
              if (prev.includes('serviceType'))
              {
                return prev.filter((error) => error !== 'serviceType')
              }
              return prev
            })
          } }
        >
          <option value="blank" disabled>Select a Service Type</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical Work</option>
          <option value="HVAC">HVAC Maintenance</option>
          <option value="Cleaning">Cleaning Services</option>
          <option value="Landscaping">Landscaping</option>
          <option value="General Repair">General Repair</option>
        </select>
        {
          errors.includes('serviceType') &&

          <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
            <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
          </div>
        }
      </div>

      <div className="relative col-span-full">
        <label
          htmlFor="job-desc"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Description
        </label>
        <textarea
          id="job-desc"
          name="job-desc"
          rows='4'
          placeholder="e.g., Repair leaky faucet in the kitchen"
          className={ `${ errors.includes('jobDescription') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
          value={ newJobData.jobDetails.jobDescription }
          onChange={ (e) =>
          {
            const newValue = e.target.value

            setNewJobData(prev => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                jobDescription: newValue
              }
            }))

            setErrors(prev =>
            {
              if (prev.includes('jobDescription'))
              {
                return prev.filter((error) => error !== 'jobDescription')
              }
              return prev
            })
          } }
        />
        {
          errors.includes('serviceType') &&

          <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
            <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
          </div>
        }
      </div>

      <div className="relative col-span-full sm:col-span-2 w-full">
        <label
          htmlFor="scheduled-date"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Scheduled Date
        </label>
        <input
          id="scheduled-date"
          name="scheduled-date"
          type="date"
          className={ `${ errors.includes('scheduledDate') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
          value={ newJobData.jobDetails.scheduledDate }
          onChange={ (e) =>
          {
            const newValue = e.target.value

            setNewJobData(prev => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                scheduledDate: newValue
              }
            }))

            setErrors(prev =>
            {
              if (prev.includes('scheduledDate'))
              {
                return prev.filter((error) => error !== 'scheduledDate')
              }
              return prev
            })
          } }
        />
        {
          errors.includes('serviceType') &&

          <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
            <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
          </div>
        }
      </div>

      <div className="relative col-span-full sm:col-span-2 w-full">
        <label
          htmlFor="scheduled-time"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Scheduled Time
        </label>
        <input
          id="scheduled-time"
          name="scheduled-time"
          type="time"
          className={ `${ errors.includes('scheduledTime') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
          value={ newJobData.jobDetails.scheduledTime }
          onChange={ (e) =>
          {
            const newValue = e.target.value

            setNewJobData(prev => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                scheduledTime: newValue
              }
            }))

            setErrors(prev =>
            {
              if (prev.includes('scheduledTime'))
              {
                return prev.filter((error) => error !== 'scheduledTime')
              }
              return prev
            })
          } }
        />
        {
          errors.includes('serviceType') &&

          <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
            <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
          </div>
        }
      </div>

      <div className="relative col-span-full w-full">
        <input
          id="same-address"
          name="same-address"
          type="checkbox"
          defaultChecked={ newJobData.jobDetails.differentAddress }
          className="h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-600"
          onChange={ () => setNewJobData(prev => ({
            ...prev,
            jobDetails: {
              ...prev.jobDetails,
              differentAddress: !prev.jobDetails.differentAddress
            }
          })) }
        />
        <label htmlFor="same-address" className="ml-3 text-sm font-medium text-gray-900">
          Location different than customer's address
        </label>
      </div>

      {
        newJobData.jobDetails.differentAddress &&

        <>
          <div className="relative col-span-full sm:col-span-3 w-full">
            <AddressInputComponent
              value={ newJobData.jobDetails.serviceLocation.address1 }
              setValue={ (e) => setNewJobData(prev => ({
                ...prev,
                jobDetails: {
                  ...prev.jobDetails,
                  serviceLocation: {
                    ...prev.jobDetails.serviceLocation,
                    address1: e.target.value
                  }
                }
              })) }
              onPlaceSelect={ (place) =>
              {
                setNewJobData(prev => ({
                  ...prev,
                  jobDetails: {
                    ...prev.jobDetails,
                    serviceLocation: {
                      ...prev.jobDetails.serviceLocation,
                      address1: place.name,
                      city: place.address_components.map((component) => component.types.includes('locality') ? component.long_name : '').join(''),
                      state: place.address_components.map((component) => component.types.includes('administrative_area_level_1') ? component.short_name : '').join(''),
                      zip: place.address_components.map((component) => component.types.includes('postal_code') ? component.long_name : '').join('')
                    }
                  }
                }))
              } }
              errors={ errors }
              setErrors={ setErrors }
              errorValue='address1'
            />
          </div>

          <div className="relative col-span-full sm:col-span-1 w-full">
            <label
              htmlFor="address2"
              className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
            >
              Apt/Suite #
            </label>
            <input
              id="address2"
              name="address2"
              type="text"
              placeholder="265"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              value={ newJobData.jobDetails.serviceLocation.address2 }
              onChange={ (e) => setNewJobData(prev => ({
                ...prev,
                jobDetails: {
                  ...prev.jobDetails,
                  serviceLocation: {
                    ...prev.jobDetails.serviceLocation,
                    address2: e.target.value
                  }
                }
              })) }
            />
          </div>

          <div className="col-span-full grid grid-cols-3 gap-5 gap-y-10">
            <div className="relative col-span-full sm:col-span-1 w-full">
              <label
                htmlFor="city"
                className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="Atlanta"
                className={ `${ errors.includes('city') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
                value={ newJobData.jobDetails.serviceLocation.city }
                onChange={ (e) =>
                {
                  const newValue = e.target.value

                  setNewJobData(prev => ({
                    ...prev,
                    jobDetails: {
                      ...prev.jobDetails,
                      serviceLocation: {
                        ...prev.jobDetails.serviceLocation,
                        city: newValue
                      }
                    }
                  }))

                  setErrors(prev =>
                  {
                    if (newValue && prev.includes('city'))
                    {
                      return prev.filter((error) => error !== 'city')
                    }
                    return prev
                  })
                } }
              />
              {
                errors.includes('city') &&

                <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
                </div>
              }
            </div>

            <div className="relative col-span-full sm:col-span-1 w-full">
              <label
                htmlFor="state"
                className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
              >
                State
              </label>
              <select
                id="state"
                name="state"
                value={ newJobData.jobDetails.serviceLocation.state || 'blank' }
                className={ `${ errors.includes('state') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
                onChange={ (e) =>
                {
                  const newValue = e.target.value

                  setNewJobData(prev => ({
                    ...prev,
                    jobDetails: {
                      ...prev.jobDetails,
                      serviceLocation: {
                        ...prev.jobDetails.serviceLocation,
                        state: newValue
                      }
                    }
                  }))

                  setErrors(prev =>
                  {
                    if (newValue && prev.includes('state'))
                    {
                      return prev.filter((error) => error !== 'state')
                    }
                    return prev
                  })
                } }
              >

                <option value="blank" disabled>Select A State</option>

                {
                  states.map((state, stateIdx) => (
                    <option key={ stateIdx } value={ state }>
                      { state }
                    </option>
                  ))
                }

              </select>
              {
                errors.includes('state') &&

                <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
                </div>
              }
            </div>

            <div className="relative col-span-full sm:col-span-1 w-full">
              <label
                htmlFor="zip"
                className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
              >
                Zip
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                placeholder="12345"
                className={ `${ errors.includes('zip') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
                value={ newJobData.jobDetails.serviceLocation.zip }
                onChange={ (e) =>
                {
                  const newValue = e.target.value

                  setNewJobData(prev => ({
                    ...prev,
                    jobDetails: {
                      ...prev.jobDetails,
                      serviceLocation: {
                        ...prev.jobDetails.serviceLocation,
                        zip: newValue
                      }
                    }
                  }))

                  setErrors(prev =>
                  {
                    if (newValue && prev.includes('zip'))
                    {
                      return prev.filter((error) => error !== 'zip')
                    }
                    return prev
                  })
                } }
              />
              {
                errors.includes('zip') &&

                <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
                </div>
              }
            </div>
          </div>
        </>
      }

      <div className="relative col-span-full w-full">
        <label
          htmlFor="service-items"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Service Items/Areas
        </label>
        <input
          id="service-items"
          name="service-items"
          type="text"
          placeholder="e.g., Kitchen Sink, AC Unit"
          className={ `${ errors.includes('serviceItems') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
          value={ newJobData.jobDetails.serviceItems }
          onChange={ (e) =>
          {
            const newValue = e.target.value

            setNewJobData(prev => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                serviceItems: newValue
              }
            }))

            setErrors(prev =>
            {
              if (prev.includes('serviceItems'))
              {
                return prev.filter((error) => error !== 'serviceItems')
              }
              return prev
            })
          } }
        />
        {
          errors.includes('serviceItems') &&

          <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
            <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
          </div>
        }
      </div>

      <div className="relative col-span-full">
        <label
          htmlFor="materials-needed"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Materials Needed
        </label>
        <textarea
          id="materials-needed"
          name="materials-needed"
          rows='4'
          placeholder="e.g., 2x4 lumber, 1/2 inch copper pipe"
          className={ `${ errors.includes('materialsNeeded') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
          value={ newJobData.jobDetails.materialsNeeded }
          onChange={ (e) =>
          {
            const newValue = e.target.value

            setNewJobData(prev => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                materialsNeeded: newValue
              }
            }))

            setErrors(prev =>
            {
              if (prev.includes('materialsNeeded'))
              {
                return prev.filter((error) => error !== 'materialsNeeded')
              }
              return prev
            })
          } }
        />
        {
          errors.includes('materialsNeeded') &&

          <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
            <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
          </div>
        }
      </div>

      <div className="relative col-span-full sm:col-span-2 w-full">
        <label
          htmlFor="pricing-type"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Pricing Type
        </label>
        <select
          id="pricing-type"
          name="pricing-type"
          defaultValue={ newJobData.jobDetails.pricingType || 'blank' }
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          onChange={ (e) => setNewJobData(prev => ({
            ...prev,
            jobDetails: {
              ...prev.jobDetails,
              pricingType: e.target.value
            }
          })) }
        >
          <option value="blank" disabled>Select Pricing Type</option>
          <option value="Hourly Rate">Hourly Rate</option>
          <option value="Flat Rate">Flat Rate</option>
        </select>
      </div>

      <div className="relative col-span-full sm:col-span-2 w-full">
        <label
          htmlFor="estimated-price"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Estimated Price
        </label>
        <div className="absolute left-2 top-2 flex items-center">
          <label htmlFor="curency-symbol" className="sr-only">
            USD
          </label>
          <p
            id="currency-symbol"
            className="w-full flex justify-center items-center rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
          >
            $
          </p>
        </div>
        <input
          id="estimated-price"
          name="estimated-price"
          type="text"
          placeholder="327.00"
          className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          value={ newJobData.jobDetails.estimatedPrice }
          onChange={ (e) => setNewJobData(prev => ({
            ...prev,
            jobDetails: {
              ...prev.jobDetails,
              estimatedPrice: e.target.value
            }
          })) }
        />
      </div>

      <div className="relative col-span-full w-full">
        <label
          htmlFor="safety-concerns"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Safety Concerns
        </label>
        <textarea
          id="safety-concerns"
          name="safety-concerns"
          rows="3"
          placeholder="e.g., Turn off power before working on electrical panel"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          value={ newJobData.jobDetails.safetyConcerns }
          onChange={ (e) => setNewJobData(prev => ({
            ...prev,
            jobDetails: {
              ...prev.jobDetails,
              safetyConcerns: e.target.value
            }
          })) }
        ></textarea>
      </div>

      <div className="relative col-span-full w-full">
        <label
          htmlFor="instructions"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Customer Instructions / Notes
        </label>
        <textarea
          id="instructions"
          name="instructions"
          rows="3"
          placeholder="e.g., Turn off power before working on electrical panel"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          value={ newJobData.jobDetails.customerInstructions }
          onChange={ (e) => setNewJobData(prev => ({
            ...prev,
            jobDetails: {
              ...prev.jobDetails,
              customerInstructions: e.target.value
            }
          })) }
        ></textarea>
      </div>

      <div className="relative col-span-full sm:col-span-2 w-full">
        <label
          htmlFor="attachments"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Attachments
        </label>
        <input
          id="attachments"
          name="attachments"
          type="file"
          multiple
          className="block w-full text-gray-900 py-1.5 sm:text-sm sm:leading-6"
          onChange={ (e) =>
          {
            const files = Array.from(e.target.files)
            const fileURLs = files.map((file) => URL.createObjectURL(file))
            setNewJobData((prev) => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                attachments: fileURLs
              }
            }))
          } }
        />
      </div>

      {
        newJobData.jobDetails.attachments.length > 0 &&

        <div className="relative col-span-full grid grid-cols-2 sm:grid-cols-4 gap-5">
          {
            newJobData.jobDetails.attachments.map((file, fileIdx) => (
              <div key={ fileIdx } className="flex justify-center items-center gap-3 shadow-md p-3">
                <img
                  src={ file }
                  alt={ `Attachment ${ fileIdx + 1 }` }
                  className="h-20 w-20 object-cover rounded-md"
                />
              </div>
            ))
          }
        </div>
      }

      <div className="relative col-span-full sm:col-span-3 w-full">
        <label
          htmlFor="custom-services"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Custom Services
        </label>
        <input
          id="custom-services"
          name="custom-services"
          type="text"
          placeholder="e.g., Follow-up Maintenance, Additional Inspections"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          value={ newJobData.jobDetails.customServices }
          onChange={ (e) => setNewJobData(prev => ({
            ...prev,
            jobDetails: {
              ...prev.jobDetails,
              customServices: e.target.value
            }
          })) }
        />
      </div>
    </div>
  )
}

export default JobDetails
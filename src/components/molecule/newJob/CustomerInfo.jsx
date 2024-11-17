'use client'

import { useContext } from 'react'
import { JobContext } from '@providers/context/JobProvider'
import { Switch } from '@headlessui/react'
import { states } from '@lib/helpers/defaultData'
import AddressInputComponent from '@components/atom/Google/GoogleAddressVerify'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

const CustomerInfo = () =>
{
  const { newJobState, errorsState } = useContext(JobContext)
  const [ newJobData, setNewJobData ] = newJobState
  const [ errors, setErrors ] = errorsState

  return (
    <div className="grid grid-cols-4 w-full md:w-2/3 2xl:w-2/5 sm:gap-x-5 gap-y-10 sm:gap-y-14 mb-20 sm:mb-0">
      <div className="col-span-full flex justify-center items-center gap-5 bg-sky-100 py-2 rounded-full">
        <p className='text-sm w-36 text-right'>
          New <span className='hidden sm:inline'>Customer</span>
        </p>
        <Switch
          checked={ newJobData.isReturnCustomer }
          onChange={ () => setNewJobData(prev => ({
            ...prev,
            isReturnCustomer: !prev.isReturnCustomer
          })) }
          className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-offset-2 data-[checked]:bg-sky-700 bg-sky-700"
        >
          <span className="sr-only">Use setting</span>
          <span className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
            <span
              aria-hidden="true"
              className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
            >
              <svg fill="none" viewBox="0 0 12 12" className="h-3 w-3 text-sky-700">
                <path
                  d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                  stroke="currentColor"
                  strokeWidth={ 2 }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
            >
              <svg fill="currentColor" viewBox="0 0 12 12" className="h-3 w-3 text-sky-700">
                <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
              </svg>
            </span>
          </span>
        </Switch>
        <p className='text-sm w-36'>
          Returning <span className='hidden sm:inline'>Customer</span>
        </p>
      </div>

      {
        newJobData.isReturnCustomer &&

        <div className="relative col-span-full">
          <label
            htmlFor="return-customer"
            className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
          >
            Customer
          </label>
          <select
            id="return-customer"
            name="return-customer"
            defaultValue="blank"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          >
            <option value="blank" disabled>Select A Customer</option>
            <option value="1">Jane Smith</option>
            <option value="2">John Doe</option>
            <option value="3">Jane Doe</option>
            <option value="4">John Smith</option>
          </select>
        </div>
      }

      <div className="relative col-span-full sm:col-span-2 w-full">
        <label
          htmlFor="firstname"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          First Name
        </label>
        <input
          id="firstname"
          name="firstname"
          type="text"
          placeholder="Jane"
          className={ `${ errors.includes('firstname') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
          value={ newJobData.customer.firstname }
          onChange={ (e) =>
          {
            const newValue = e.target.value

            setNewJobData(prev => ({
              ...prev,
              customer: {
                ...prev.customer,
                firstname: newValue
              }
            }))

            setErrors(prev =>
            {
              if (newValue && prev.includes('firstname'))
              {
                return prev.filter(error => error !== 'firstname')
              }

              return prev
            })
          } }
        />
        {
          errors.includes('firstname') &&

          <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
            <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
          </div>
        }
      </div>

      <div className="relative col-span-full sm:col-span-2 w-full">
        <label
          htmlFor="lastname"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Last Name
        </label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          placeholder="Smith"
          className={ `${ errors.includes('lastname') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
          value={ newJobData.customer.lastname }
          onChange={ (e) =>
          {
            const newValue = e.target.value

            setNewJobData(prev => ({
              ...prev,
              customer: {
                ...prev.customer,
                lastname: newValue
              }
            }))

            setErrors(prev =>
            {
              if (newValue && prev.includes('lastname'))
              {
                return prev.filter(error => error !== 'lastname')
              }

              return prev
            })
          } }
        />
        {
          errors.includes('lastname') &&

          <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
            <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
          </div>
        }
      </div>

      <div className="relative col-span-full sm:col-span-2 w-full">
        <label
          htmlFor="email"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Jane.Smith@example.com"
          className={ `${ errors.includes('email') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
          value={ newJobData.customer.email }
          onChange={ (e) =>
          {
            const newValue = e.target.value

            setNewJobData(prev => ({
              ...prev,
              customer: {
                ...prev.customer,
                email: newValue
              }
            }))

            setErrors(prev =>
            {
              if (newValue && prev.includes('email'))
              {
                return prev.filter(error => error !== 'email')
              }

              return prev
            })
          } }
        />
        {
          errors.includes('email') &&

          <>
            <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
              <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
            </div>
          </>
        }
      </div>

      <div className="relative col-span-full sm:col-span-2 w-full">
        <label
          htmlFor="email"
          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
        >
          Phone
        </label>
        <div className="absolute left-2 top-2 flex items-center">
          <label htmlFor="country" className="sr-only">
            Country
          </label>
          <p
            id="country"
            className="w-full flex justify-center items-center rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
          >
            US
          </p>
        </div>
        <input
          id="phone-number"
          name="phone-number"
          type="text"
          placeholder="555-987-6543"
          className={ `${ errors.includes('phoneNumber') ? 'ring-2 ring-red-500' : 'ring-0' } block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
          value={ newJobData.customer.phoneNumber }
          onChange={ (e) =>
          {
            const newValue = e.target.value

            setNewJobData(prev => ({
              ...prev,
              customer: {
                ...prev.customer,
                phoneNumber: newValue
              }
            }))

            setErrors(prev =>
            {
              if (newValue && prev.includes('phoneNumber'))
              {
                return prev.filter(error => error !== 'phoneNumber')
              }

              return prev
            })
          } }
        />
        {
          errors.includes('phoneNumber') &&

          <>
            <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
              <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
            </div>
          </>
        }
      </div>

      <div className="relative col-span-full sm:col-span-3 w-full">
        <AddressInputComponent
          value={ newJobData.customer.address1 }
          setValue={ (e) => setNewJobData(prev => ({
            ...prev,
            customer: {
              ...prev.customer,
              address1: e.target.value
            }
          })) }
          onPlaceSelect={ (place) =>
          {
            setNewJobData((prev) => ({
              ...prev,
              customer: {
                ...prev.customer,
                address1: place.name,
                city: place.address_components.map((component) => component.types.includes('locality') ? component.long_name : '').join(''),
                state: place.address_components.map((component) => component.types.includes('administrative_area_level_1') ? component.short_name : '').join(''),
                zip: place.address_components.map((component) => component.types.includes('postal_code') ? component.long_name : '').join(''),
              },
            }))

            setErrors((prev) =>
            {
              const updatedErrors = [ ...prev ]

              if (place.name && updatedErrors.includes('address1'))
              {
                updatedErrors.splice(updatedErrors.indexOf('address1'), 1)
              }
              if (place.address_components.some((component) => component.types.includes('locality')) && updatedErrors.includes('city'))
              {
                updatedErrors.splice(updatedErrors.indexOf('city'), 1)
              }
              if (place.address_components.some((component) => component.types.includes('administrative_area_level_1')) && updatedErrors.includes('state'))
              {
                updatedErrors.splice(updatedErrors.indexOf('state'), 1)
              }
              if (place.address_components.some((component) => component.types.includes('postal_code')) && updatedErrors.includes('zip'))
              {
                updatedErrors.splice(updatedErrors.indexOf('zip'), 1)
              }

              return updatedErrors
            })
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
          value={ newJobData.customer.address2 }
          onChange={ (e) => setNewJobData(prev => ({
            ...prev,
            customer: {
              ...prev.customer,
              address2: e.target.value
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
            value={ newJobData.customer.city }
            onChange={ (e) =>
            {
              const newValue = e.target.value

              setNewJobData(prev => ({
                ...prev,
                customer: {
                  ...prev.customer,
                  city: newValue
                }
              }))

              setErrors(prev =>
              {
                if (newValue && prev.includes('city'))
                {
                  return prev.filter(error => error !== 'city')
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
            value={ newJobData.customer.state || 'blank' }
            className={ `${ errors.includes('state') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
            onChange={ (e) =>
            {
              const newValue = e.target.value

              setNewJobData(prev => ({
                ...prev,
                customer: {
                  ...prev.customer,
                  state: newValue
                }
              }))

              setErrors(prev =>
              {
                if (newValue && prev.includes('state'))
                {
                  return prev.filter(error => error !== 'state')
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
            type="number"
            min='00000'
            max='99999'
            placeholder="12345"
            className={ `${ errors.includes('zip') ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
            value={ newJobData.customer.zip }
            onChange={ (e) =>
            {
              const newValue = e.target.value

              setNewJobData(prev => ({
                ...prev,
                customer: {
                  ...prev.customer,
                  zip: newValue
                }
              }))

              setErrors(prev =>
              {
                if (newValue && prev.includes('zip'))
                {
                  return prev.filter(error => error !== 'zip')
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
    </div>
  )
}

export default CustomerInfo
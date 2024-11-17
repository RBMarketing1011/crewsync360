import GoogleMapComponent from '@components/atom/Google/GoogleMapComponent'
import GoogleMap from '@components/atom/Google/GoogleMapComponent'
import NoData from '@components/atom/NoData'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { PaperClipIcon } from '@heroicons/react/24/solid'

const ReviewDetails = ({ newJobData, setCurrentStep }) =>
{
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-x-12 pb-36 px-12">

      <div className='col-span-2'>
        <div className="px-4 sm:px-0 flex justify-between items-center">
          <h3 className="text-xl font-semibold leading-7 text-sky-700">
            Customer Information
          </h3>
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100/60 sm:mt-0 sm:w-auto text-nowrap gap-2"
            onClick={ () => setCurrentStep(0) }
          >
            <PencilSquareIcon className='w-5 h-5 text-gray-900' />
            Edit
          </button>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.customer.firstname } { newJobData.customer.lastname }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                New Customer?
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { !newJobData.isReturnCustomer ? "Yes" : "No" }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 w-full truncate">
                { newJobData.customer.email }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Phone
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.customer.phoneNumber }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.customer.address1 }{ newJobData.customer.address2 && ' #' + newJobData.customer.address2 },<br />{ newJobData.customer.city }, { newJobData.customer.state } { newJobData.customer.zip }
              </dd>
            </div>
          </dl>
        </div>

        <div className="px-4 sm:px-0 my-3">
          <h3 className="text-xl font-semibold leading-7 text-sky-700">
            Service Location
          </h3>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            { `${ newJobData.jobDetails.differentAddress ?
              `${ newJobData.jobDetails.serviceLocation.address1 }, ${ newJobData.jobDetails.serviceLocation.city }, ${ newJobData.jobDetails.serviceLocation.state } ${ newJobData.jobDetails.serviceLocation.zip }`

              :

              `${ newJobData.customer.address1 }, ${ newJobData.customer.city }, ${ newJobData.customer.state } ${ newJobData.customer.zip }`
              }` }
          </p>
        </div>
        {/* <div className="w-full aspect-square">
          <GoogleMapComponent
            height='275px'
            address={ `${ newJobData.jobDetails.differentAddress ?
              `${ newJobData.jobDetails.serviceLocation.address1 }, ${ newJobData.jobDetails.serviceLocation.city }, ${ newJobData.jobDetails.serviceLocation.state } ${ newJobData.jobDetails.serviceLocation.zip }`

              :

              `${ newJobData.customer.address1 }, ${ newJobData.customer.city }, ${ newJobData.customer.state } ${ newJobData.customer.zip }`
              }` } />
        </div> */}
      </div>

      <div className='col-span-2 mt-5 sm:mt-0'>
        <div className="px-4 sm:px-0 flex justify-between items-center">
          <h3 className="text-xl font-semibold leading-7 text-sky-700">
            Job Details
          </h3>
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100/60 sm:mt-0 sm:w-auto text-nowrap gap-2"
            onClick={ () => setCurrentStep(1) }
          >
            <PencilSquareIcon className='w-5 h-5 text-gray-900' />
            Edit
          </button>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Title
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.jobDetails.jobTitle }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Type
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.jobDetails.serviceType }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Description
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.jobDetails.jobDescription }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Date & Time
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { new Date(`${ newJobData.jobDetails.scheduledDate }T${ newJobData.jobDetails.scheduledTime }`).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Items to Service
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.jobDetails.serviceItems }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Materials
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.jobDetails.materialsNeeded }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Pricing
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.jobDetails.pricingType } - { newJobData.jobDetails.estimatedPrice }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Safety Concerns
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.jobDetails.safetyConcerns }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Customer Instructions
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.jobDetails.customerInstructions }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Custom Services
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.jobDetails.customServices }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Different Address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.jobDetails.differentAddress ? "Yes" : "No" }
                <br />
                {
                  newJobData.jobDetails.differentAddress &&

                  <p>
                    { newJobData.jobDetails.serviceLocation.address1 + ' ' }
                    { newJobData.jobDetails.serviceLocation.address2 && '#' + newJobData.jobDetails.serviceLocation.address2 }<br />
                    { newJobData.jobDetails.serviceLocation.city + ', ' }
                    { newJobData.jobDetails.serviceLocation.state + ' ' }
                    { newJobData.jobDetails.serviceLocation.zip }
                  </p>
                }
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Attachments
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                { newJobData.jobDetails.attachments.length > 0 ? 'Yes' : 'No' }
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className='col-span-2 mt-5 xl:mt-0'>
        <div className="px-4 sm:px-0 flex justify-between items-center mb-10">
          <h3 className="text-xl font-semibold leading-7 text-sky-700">
            Attachments
          </h3>
        </div>
        <div className='col-span-full grid grid-cols-2 gap-3'>
          {
            newJobData.jobDetails.attachments.length > 0 ?

              newJobData.jobDetails.attachments.map((file, fileIdx) => (
                <div key={ fileIdx } className="flex justify-center items-center gap-3 shadow-md p-3">
                  <img
                    src={ file }
                    alt={ `Attachment ${ fileIdx + 1 }` }
                    className="h-20 w-20 object-cover rounded-md"
                  />
                </div>
              ))

              :

              <div className="col-span-full">
                <NoData
                  title='No Attachments'
                  desc='No attachments uploaded for this job.'
                  outline='true'
                  icon={ <PaperClipIcon className='h-8 w-8 text-gray-700' /> }
                  align='center'
                />
              </div>
          }
        </div>
      </div>

    </div>
  )
}

export default ReviewDetails
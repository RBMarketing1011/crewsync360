'use client'

import { useContext } from 'react'
import { StripeContext } from '@providers/context/StripeContextProvider'

import
{
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js'

import Loading from '@components/atom/Loading'

const AddBillingDetails = () =>
{
  const {
    errorMessageState, successMessageState,
    clientSecretState, clientIdState, stripeLoadingState
  } = useContext(StripeContext)

  const [ errorMessage, setErrorMessage ] = errorMessageState
  const [ successMessage, setSuccessMessage ] = successMessageState
  const [ clientSecret ] = clientSecretState
  const [ clientId ] = clientIdState
  const [ stripeLoading ] = stripeLoadingState

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) =>
  {
    e.preventDefault()

    setErrorMessage('')
    setSuccessMessage('')

    if (!stripe || !elements)
    {
      return // Stripe.js has not yet loaded.
    }

    // Call elements.submit() first before confirmSetup()
    const submitResult = await elements.submit()

    if (submitResult.error)
    {
      // Handle error if form data submission fails
      setErrorMessage(submitResult.error.message)
      return
    }

    // Confirm the setup intent with PaymentElement
    const result = await stripe.confirmSetup({
      elements,
      clientSecret,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: 'if_required', // prevents redirecting if no action is required
    })

    if (result.error)
    {
      // Show error to your customer
      setErrorMessage(result.error.message)
    } else
    {
      // The setup succeeded, and we have the payment method ID
      const paymentMethodId = result.setupIntent.payment_method

      // Now send the paymentMethodId and customerId to your backend to save as default
      const response = await fetch('/api/v1/stripe/set-default-payment-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId,
          customerId: clientId,
        }),
      })

      const res = await response.json()
      if (res.error)
      {
        setErrorMessage(res.error)
      } else
      {
        setSuccessMessage('Payment method saved successfully!')
      }
    }
  }


  return (
    <>
      {
        (!clientSecret || !stripe || !elements) ?

          <Loading
            title='Loading Payment'
            text='Please wait while we load the payment form...'
          />

          :

          <div className='w-full'>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Verify Billing Info
            </h2>

            { clientSecret && <PaymentElement /> }
            { errorMessage &&
              <span className="mt-4 flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                { errorMessage }
              </span>
            }
            { successMessage &&
              <span className="mt-4 flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                { successMessage }
              </span>
            }
            { stripeLoading && <p>Loading...</p> }

            <button
              type="button"
              disabled={ successMessage ? true : false }
              className='rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5 disabled:bg-indigo-200'
              onClick={ (e) => handleSubmit(e) }
            >
              Activate Free Trial
            </button>

          </div>
      }
    </>
  )
}

export default AddBillingDetails
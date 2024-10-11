'use client'

import { useContext, useEffect } from 'react'
import { MiscContext } from '@providers/context/MiscProvider'
import { NewUserScreenContext } from '@providers/context/NewUserScreenProvider'
import { clientLog } from '@lib/helpers/winston/clientLog'
import { toast } from 'react-toastify'
import { UserContext } from '@providers/context/UserProvider'

const VerifyEmail = () =>
{
  const { tokenState } = useContext(MiscContext)
  const [ token, setToken ] = tokenState

  const { sessionState } = useContext(UserContext)
  const [ session ] = sessionState

  const { emailErrorState } = useContext(NewUserScreenContext)
  const [ emailError, setEmailError ] = emailErrorState

  useEffect(() =>
  {
    setEmailError({
      type: '',
      message: '',
      showError: false
    })
  }, [])

  const verifyEmail = async (e) =>
  {
    e.preventDefault()

    try
    {
      const req = await fetch('/api/v1/users/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, email: session?.user?.email }),
      })

      const res = await req.json()

      if (res.success)
      {
        toast.success('Email verified successfully.')
        setToken('')

        setEmailError({
          type: 'success',
          message: 'Verified',
          showError: true
        })
      }
      else if (res.error)
      {
        clientLog(res.error)

        setEmailError({
          type: 'failed',
          message: 'Try Again!',
          showError: true
        })
      }
    } catch (error)
    {
      clientLog(error.message)
      throw new Error(error.message)
    }
  }
  return (
    <main className='px-4 sm:px-6 flex flex-col gap-12'>
      <div className="bg-white py-5">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Verify You Email
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          To complete your sign-in, please enter the verification code we sent to your email address.
        </p>
      </div>

      <div>
        <div>
          <label htmlFor="code" className="text-sm font-medium leading-6 text-gray-900 flex items-center gap-3">
            Verification Code

            {
              emailError.showError &&
              <span className={ `${ emailError.type === 'success'
                ? 'bg-green-50 text-green-700 ring-green-600/20'
                :
                'bg-red-50 text-red-700 ring-red-600/10' } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset` }>
                { emailError.message }
              </span>
            }

          </label>
          <div className="mt-2">
            <input
              id="code"
              name="code"
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              value={ token }
              onChange={ (e) => setToken(e.target.value) }
            />
          </div>
        </div>
        <button
          type="button"
          className="mt-4 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          onClick={ verifyEmail }
        >
          Verify Email
        </button>
      </div>

      <div>
        <p>
          Check your inbox for an email containing a 6-digit verification code. Enter the code in the field above to verify your email.
        </p>
      </div>
    </main>
  )
}

export default VerifyEmail
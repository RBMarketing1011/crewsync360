'use client'

import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserContext } from '@providers/context/UserProvider'
import
{
  SparklesIcon, CheckCircleIcon, ArrowRightIcon, FireIcon
} from '@heroicons/react/24/outline'
import { clientLog } from '@lib/helpers/winston/clientLog'

const NewUserCompleted = () =>
{
  const { sessionState } = useContext(UserContext)
  const [ session ] = sessionState

  const router = useRouter()

  useEffect(() =>
  {
    const updateLoggedInStatus = async () =>
    {
      try
      {
        const req = await fetch(`/api/v1/account/${ session.account._id }/users/${ session.user._id }`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            hasLoggedIn: true
          })
        })

        const res = await req.json()

        if (res.success)
        {
          setTimeout(() =>
          {
            router.push(`/account/${ session.account._id }/dashboard`)
          }, 5000)
        } else if (res.error)
        {
          clientLog(res.error)
        }

      } catch (error)
      {
        clientLog(error.message)
      }
    }

    updateLoggedInStatus()

  }, [])

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 text-center">
        <div className="flex justify-center mb-4">
          <SparklesIcon className="h-8 w-8 text-sky-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">All Set, You&apos;re Good to Go!</h1>
        <p className="text-gray-700 mb-6">
          Thanks for sticking with us through the setup! You&apos;ve officially leveled up your account and unlocked the magical powers of our software.
        </p>
        <div className="flex justify-center mb-4">
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
        </div>
        <p className="text-gray-700 mb-6">
          Don’t worry, the hard part’s over — now it’s smooth sailing from here on out.
        </p>
        <div className="flex justify-center mb-4">
          <FireIcon className="h-6 w-6 text-red-500" />
        </div>
        <p className="text-gray-700 mb-6">
          We’re redirecting you to the dashboard in just a moment. Grab a snack, do a victory dance, or simply sit back and bask in the glory of your accomplishment.
        </p>
        <div className="flex justify-center mb-4">
          <ArrowRightIcon className="h-6 w-6 text-blue-500" />
        </div>
        <p className="text-gray-500">See you on the other side!</p>
      </div>
    </main>
  )
}

export default NewUserCompleted
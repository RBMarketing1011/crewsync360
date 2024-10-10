'use client'

import { useContext } from 'react'
import { NewUserScreenContext } from '@providers/context/NewUserScreenProvider'
import ProgressBar from '@components/atom/ProgressBar'

const NewUserCard = ({ submit, children }) =>
{
  const {
    progressState, currentState, emailErrorState
  } = useContext(NewUserScreenContext)

  const [ progress, setProgress ] = progressState
  const [ current, setCurrent ] = currentState
  const [ emailError, setEmailError ] = emailErrorState

  const skipPage = () =>
  {
    try
    {
      progress.map((step, idx) =>
      {
        if (step.status === 'current')
        {
          setProgress(prev => prev.map((step, index) =>
          {
            if (index === idx)
            {
              return {
                ...step,
                status: 'complete',
                complete: true
              }
            } else if (index === idx + 1)
            {
              return {
                ...step,
                status: 'current'
              }
            } else
            {
              return step
            }
          }))
        }
      })

      progress.map((step, idx) =>
      {
        if (step.status === 'current')
        {
          setCurrent(step.name)
        }
      })
    } catch (error)
    {
      toast.error(error.message)
    }
  }

  return (
    <form
      className="rounded-lg bg-white md:shadow-[0_0_10px_grey] w-screen md:max-w-[600px] md:h-[800px] p-10 flex flex-col justify-between"
      onSubmit={ submit }
    >

      {
        current.name !== 'New User Completed' &&

        <div className="px-4 py-5 sm:px-6 w-full flex justify-center">
          <ProgressBar state={ { progress, setProgress } } />
        </div>
      }

      <div className="px-4 py-5 sm:p-6 w-full h-full flex justify-center">
        {/* Content goes here */ }
        { children }
      </div>
      <div className="px-4 py-4 sm:px-6 w-full flex justify-end">
        {
          !current.required &&

          <button
            type="button"
            className="rounded-md px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={ skipPage }
          >
            Skip
          </button>
        }

        {
          current.name === 'Add Users' ?

            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={ skipPage }
            >
              Next &rarr;
            </button>

            :

            current.name === 'New User Completed' ?

              null

              :

              <button
                type="button"
                className="rounded-md bg-indigo-200 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:cursor-default"
              >
                Next &rarr;
              </button>
        }
      </div>
    </form>
  )
}

export default NewUserCard
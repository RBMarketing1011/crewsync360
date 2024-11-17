'use client'

import { useState, useEffect } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'

const NewJobProgressBar = ({ currentStep }) =>
{
  const [ steps, setSteps ] = useState([
    {
      "step": 1,
      "name": "Customer Info",
      "status": "current"
    },
    {
      "step": 2,
      "name": "Job Details",
      "status": "upcoming"
    },
    {
      "step": 3,
      "name": "Review",
      "status": "upcoming"
    },
    {
      "step": 4,
      "name": "Complete",
      "status": "upcoming"
    },
  ])

  useEffect(() =>
  {
    // Update the steps based on the current step value
    setSteps((prevSteps) =>
      prevSteps.map((step, index) =>
      {
        if (index < currentStep)
        {
          return { ...step, status: 'complete' }
        } else if (index === currentStep)
        {
          return { ...step, status: 'current' }
        } else
        {
          return { ...step, status: 'upcoming' }
        }
      })
    )
  }, [ currentStep ])

  return (
    steps &&

    <nav aria-label="Progress" className='hidden lg:block w-full sticky top-5'>
      <ol role="list" className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">

        {
          steps.map((step, stepIdx) => (

            <li key={ step.step } className="relative md:flex md:flex-1">

              {
                step.status === 'complete' ?

                  <div className="group flex w-full items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-700 group-hover:bg-sky-800">
                        <CheckIcon aria-hidden="true" className="h-6 w-6 text-white" />
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-900">
                        { step.name }
                      </span>
                    </span>
                  </div>

                  :

                  step.status === 'current' ?

                    <div aria-current="step" className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-sky-700 bg-sky-100">
                        <span className="text-sky-700">
                          { step.step }
                        </span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-sky-700">
                        { step.name }
                      </span>
                    </div>

                    :

                    <div className="group flex items-center">
                      <span className="flex items-center px-6 py-4 text-sm font-medium">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                          <span className="text-gray-500 group-hover:text-gray-900">
                            { step.step }
                          </span>
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                          { step.name }
                        </span>
                      </span>
                    </div>

              }

              {
                stepIdx !== steps.length - 1 ?

                  <>
                    {/* Arrow separator for lg screens and up */ }
                    <div aria-hidden="true" className="absolute right-0 top-0 hidden h-full w-5 md:block">
                      <svg
                        fill="none"
                        viewBox="0 0 22 80"
                        preserveAspectRatio="none"
                        className="h-full w-full text-gray-300"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          stroke="currentcolor"
                          vectorEffect="non-scaling-stroke"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </>

                  :

                  null

              }
            </li>
          )) }
      </ol>
    </nav>
  )
}


export default NewJobProgressBar
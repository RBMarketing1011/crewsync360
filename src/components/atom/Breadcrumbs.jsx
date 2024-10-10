'use client'

import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import { useId, useContext } from 'react'
import { UserContext } from '@providers/context/UserProvider'

const Breadcrumbs = ({ pages }) =>
{
  const { sessionState } = useContext(UserContext)
  const [ session ] = sessionState

  return (
    <nav aria-label="Breadcrumb" className="flex my-3">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href={ `/account/${ session?.account?._id }/dashboard` } className="text-gray-400 hover:text-gray-500">
              <HomeIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>

        {
          pages &&
          pages.map((page) => (

            <li key={ useId() }>
              <div className="flex items-center">
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                <a
                  href={ page.href }
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >

                  { page.name }

                </a>
              </div>
            </li>

          ))
        }

      </ol>
    </nav>
  )
}
export default Breadcrumbs
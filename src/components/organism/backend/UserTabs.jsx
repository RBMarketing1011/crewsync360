'use client'

import { useId } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const UserTabs = ({ accountId, userId }) =>
{
  const path = usePathname()
  const router = useRouter()

  const tabs = [
    { name: 'Profile', href: `/account/${ accountId }/users/${ userId }/profile` },
    { name: 'Notifications', href: `/account/${ accountId }/users/${ userId }/notifications` },
    { name: 'Security', href: `/account/${ accountId }/users/${ userId }/security` },
    { name: 'Settings', href: `/account/${ accountId }/users/${ userId }/settings` },
  ]

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* 
        Use an "onChange" listener to redirect the user to the selected tab URL. */ }
        <select
          id="tabs"
          name="tabs"
          defaultValue={ path }
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          onChange={ (e) => router.push(e.target.value) }
        >

          {
            tabs.map((tab) => (

              <option key={ useId() } value={ tab.href }>{ tab.name }</option>

            ))
          }

        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">

            {
              tabs.map((tab) => (

                <a
                  key={ useId() }
                  href={ tab.href }
                  aria-current={ path === tab.href ? 'page' : undefined }
                  className={ `${ path === tab.href
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700' } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ` }
                >

                  { tab.name }

                </a>

              ))
            }

          </nav>
        </div>
      </div>
    </div>
  )
}

export default UserTabs
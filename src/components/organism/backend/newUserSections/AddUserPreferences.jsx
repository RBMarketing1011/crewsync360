'use client'

import { useContext } from 'react'
import { NewUserScreenContext } from '@providers/context/NewUserScreenProvider'
import { ThemeContext } from '@providers/context/ThemeProvider'
import { UserContext } from '@providers/context/UserProvider'

import { SunIcon, MoonIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'

import { Switch } from '@headlessui/react'
import { toast } from 'react-toastify'

const AddUserPreferences = () =>
{
  const { themeState, switchThemeState } = useContext(ThemeContext)
  const [ theme, toggleTheme ] = themeState
  const [ switchTheme, setSwitchTheme ] = switchThemeState

  const {
    userPreferencesState
  } = useContext(NewUserScreenContext)

  const [ userPreferences, setUserPreferences ] = userPreferencesState

  const { sessionState } = useContext(UserContext)
  const [ session, update ] = sessionState

  return (
    <div className='w-full dark:bg-black'>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        User Preferences
      </h2>
      <div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Theme
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex items-center justify-end gap-3">

                <SunIcon className={ `${ theme === 'light'
                  ? 'text-sky-600'
                  :
                  'text-gray-400' } h-6 w-6` } />
                <Switch
                  checked={ switchTheme }
                  onChange={ async () =>
                  {
                    toggleTheme()
                    setSwitchTheme(!switchTheme)

                    try
                    {
                      const req = await fetch(`/api/v1/account/${ session?.account._id }/users/${ session?.user?._id }`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          theme: theme === 'light' ? 'dark' : 'light'
                        })
                      })

                      const res = await req.json()

                      if (res.error) throw new Error(res.error)

                    } catch (error)
                    {
                      toast.error(error.message)
                    }
                  } }
                  className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-sky-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 data-[checked]:bg-sky-600"
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                  />
                </Switch>
                <MoonIcon className={ `${ theme === 'dark'
                  ? 'text-sky-600'
                  :
                  'text-gray-400' } h-6 w-6` } />

              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Push Notifications
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex items-center justify-end gap-3">

                <XMarkIcon className={ `${ !userPreferences.pushNotifications
                  ? 'text-sky-600'
                  :
                  'text-gray-400' } h-6 w-6` } />
                <Switch
                  checked={ userPreferences.pushNotifications }
                  onChange={ () => setUserPreferences(prev => ({
                    ...prev,
                    pushNotifications: !userPreferences.pushNotifications
                  })) }
                  className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-sky-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 data-[checked]:bg-sky-600"
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                  />
                </Switch>
                <CheckIcon className={ `${ userPreferences.pushNotifications
                  ? 'text-sky-600'
                  :
                  'text-gray-400' } h-6 w-6` } />
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Notifications
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 divide-y-2 divide-gray-100">

                {
                  userPreferences.notifications.map((n, i) => (
                    <div key={ i } className='w-full flex justify-between items-center py-[5px]'>
                      <p className='font-bold'>{ n.name }</p>
                      <Switch
                        checked={ n.enabled }
                        onChange={ () => setUserPreferences(prev => ({
                          ...prev,
                          notifications: prev.notifications.map((notification, index) => index === i
                            ? { ...notification, enabled: !notification.enabled }
                            : notification)
                        })) }
                        className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-100 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 data-[checked]:bg-sky-600"
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                        />
                      </Switch>
                    </div>
                  ))
                }

              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default AddUserPreferences
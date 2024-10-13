'use client'

import { usePathname, useRouter } from 'next/navigation'

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

const ColorTabs = ({ tabs }) =>
{
  const path = usePathname()
  const router = useRouter()

  console.log(path)

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */ }
        <select
          id="tabs"
          name="tabs"
          defaultValue={ tabs.find((tab) => path === tab.href) }
          className="block w-full rounded-md border-gray-300 focus:border-sky-500 focus:ring-sky-500"
          onChange={ (e) => router.push(tabs.find((tab) => tab.name === e.target.value).href) }
        >
          { tabs.map((tab) => (
            <option key={ tab.name }>{ tab.name }</option>
          )) }
        </select>
      </div>
      <div className="hidden sm:block">
        <nav aria-label="Tabs" className="flex space-x-4">
          { tabs.map((tab) => (
            <a
              key={ tab.name }
              href={ tab.href }
              aria-current={ path === tab.href ? 'page' : undefined }
              className={ `${ path === tab.href
                ?
                'bg-sky-700 text-sky-50'
                :
                'text-sky-700' }
                rounded-md px-3 py-2 text-sm font-medium hover:bg-sky-700 hover:text-sky-50 transition-all ease-in-out` }
            >
              { tab.name }
            </a>
          )) }
        </nav>
      </div>
    </div>
  )
}

export default ColorTabs
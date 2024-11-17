'use client'

import { FolderArrowDownIcon } from '@heroicons/react/24/outline'
import ColorTabs from '@components/atom/ColorTabs'

const Layout = ({ children, params }) =>
{
  const { accountId } = params

  const navigation = [
    { name: 'New Job', href: `/account/${ accountId }/jobs` },
    { name: 'Booked', href: `/account/${ accountId }/jobs/booked` },
    { name: 'Leads', href: `/account/${ accountId }/jobs/leads` },
    { name: 'Map', href: `/account/${ accountId }/jobs/map` },
  ]

  return (
    <>
      <div className='sticky top-16 z-[500] p-3 -mx-3  bg-white border-b border-gray-200 flex items-center justify-start'>
        <ColorTabs
          tabs={ navigation }
        />
        {/* <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition-all ease-in-out"
        >
          <FolderArrowDownIcon aria-hidden="true" className="-ml-0.5 h-5 w-5" />
          Download CSV
        </button> */}
      </div>
      {/* My Content Here */ }
      { children }
    </>
  )
}
export default Layout
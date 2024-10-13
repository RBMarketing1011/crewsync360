'use client'

import Sidebar from '@components/organism/backend/Sidebar'
import { useParams } from 'next/navigation'

const Layout = ({ children }) =>
{
  const { accountId } = useParams()

  return (
    <Sidebar accountId={ accountId }>
      { children }

      <footer className='w-full fixed bottom-0 left-0 px-4 sm:px-6 bg-white'>
        <div className="w-full lg:pl-0">
          <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left lg:ml-72">
            <span className="block sm:inline">&copy; 2021 Your Company, Inc.</span>{ ' ' }
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </Sidebar>
  )
}

export default Layout
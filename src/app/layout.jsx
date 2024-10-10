import { Inter } from "next/font/google"

import AppProvider from '@providers/AppProvider'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import '@styles/globals.css'

const inter = Inter({ subsets: [ "latin" ] })

export const metadata = {
  title: 'Crew Sync 360®',
  description: 'Crew Sync 360® is a software company that provides a suite of tools to helphome service companies manage their operations.',
}

const Layout = ({ children }) =>
{
  return (
    <html className="w-full h-full" lang="en-US">
      <body className={ `w-full h-full ${ inter.className }` }>
        <AppProvider>
          <ToastContainer />
          { children }
        </AppProvider>
      </body>
    </html>
  )
}

export default Layout
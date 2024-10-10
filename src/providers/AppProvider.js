'use client'

import AuthProvider from './session/AuthProvider'
import { ThemeProvider } from './context/ThemeProvider'
import { UserProvider } from './context/UserProvider'
import { CustomerProvider } from './context/CustomerProvider'
import { JobProvider } from './context/JobProvider'
import { MiscProvider } from './context/MiscProvider'
import { NewUserScreenProvider } from './context/NewUserScreenProvider'

const AppProvider = ({ children }) =>
{
  return (
    <AuthProvider>
      <ThemeProvider>
        <UserProvider>
          <CustomerProvider>
            <JobProvider>
              <MiscProvider>
                <NewUserScreenProvider>
                  { children }
                </NewUserScreenProvider>
              </MiscProvider>
            </JobProvider>
          </CustomerProvider>
        </UserProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default AppProvider
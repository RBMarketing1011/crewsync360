'use client'

import AuthProvider from './session/AuthProvider'
import { ThemeProvider } from './context/ThemeProvider'
import { UserProvider } from './context/UserProvider'
import { CustomerProvider } from './context/CustomerProvider'
import { JobProvider } from './context/JobProvider'
import { MiscProvider } from './context/MiscProvider'
import { NewUserScreenProvider } from './context/NewUserScreenProvider'
import GoogleAPIProvider from './google/GoogleAPIProvider'

const AppProvider = ({ children }) =>
{
  return (
    <AuthProvider>
      <GoogleAPIProvider>
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
      </GoogleAPIProvider>
    </AuthProvider>
  )
}

export default AppProvider
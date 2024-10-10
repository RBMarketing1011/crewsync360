import { createContext, useState } from 'react'

export const NewUserScreenContext = createContext()

export const NewUserScreenProvider = ({ children }) =>
{
  const [ progress, setProgress ] = useState(null)
  const [ current, setCurrent ] = useState(0)
  const [ loading, setLoading ] = useState(true)

  const [ emailError, setEmailError ] = useState({
    type: 'done',
    message: '',
    showError: false
  })

  const [ companyInfo, setCompanyInfo ] = useState({
    companyName: '',
    email: '',
    phone: '',
    companyAddress: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    },
    website: '',
    description: '',
    billing: {
      card: {
        number: '',
        expiration: '',
        cvv: '',
        zip: ''
      },
      address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
      }
    }
  })

  const [ userInfo, setUserInfo ] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    image: '',
    bio: '',
  })

  const [ userPreferences, setUserPreferences ] = useState({
    theme: 'light',
    pushNotifications: false,
    notifications: [
      { name: 'New Lead', enabled: false },
      { name: 'Estimate Updates', enabled: false },
      { name: 'Job Updates', enabled: false },
      { name: 'Payment Received', enabled: false },
      { name: 'Customer Review Received', enabled: false },
      { name: 'Invoice Sent', enabled: false },
      { name: 'Profile Update', enabled: false },
      { name: 'Password Change', enabled: false }
    ],
  })

  const [ addUser, setAddUser ] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: '',
  })

  return (
    <NewUserScreenContext.Provider value={ {
      progressState: [ progress, setProgress ],
      currentState: [ current, setCurrent ],
      loadingState: [ loading, setLoading ],
      emailErrorState: [ emailError, setEmailError ],
      companyInfoState: [ companyInfo, setCompanyInfo ],
      userInfoState: [ userInfo, setUserInfo ],
      userPreferencesState: [ userPreferences, setUserPreferences ],
      addUserState: [ addUser, setAddUser ],
    } }>

      { children }

    </NewUserScreenContext.Provider>
  )
}
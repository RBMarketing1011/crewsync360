'use client'

import { createContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) =>
{
  const [ theme, setTheme ] = useState('light')
  const [ switchTheme, setSwitchTheme ] = useState(false)

  // Function to toggle theme
  const toggleTheme = () =>
  {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const { data: session } = useSession()

  useEffect(() =>
  {
    if (session)
    {
      setTheme(session.user.theme)
    }

    setSwitchTheme(prev => (theme === 'light' ? false : true))
  }, [ session ])

  return (
    <ThemeContext.Provider value={ {
      themeState: [ theme, toggleTheme ],
      switchThemeState: [ switchTheme, setSwitchTheme ]
    } }>

      <div className={ theme }>
        { children }
      </div>

    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }

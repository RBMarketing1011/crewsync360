'use client'

import { createContext, useState } from 'react'

const MiscContext = createContext()

const MiscProvider = ({ children }) =>
{
  // For showing important notifications at top of account layout
  const [ message, setMessage ] = useState({
    text: '',
    type: '',
    link: '',
    show: false
  })
  const [ importantShown, setImportantShown ] = useState(false)
  // Menus & Modals
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false)
  const [ openModal1, setOpenModal1 ] = useState(false)
  // Token
  const [ token, setToken ] = useState('')
  // Is Page Scrolled
  const [ isPageScrolled, setIsPageScrolled ] = useState(false)

  return (
    <MiscContext.Provider value={ {
      // Messages
      messageState: [ message, setMessage ],
      importantShownState: [ importantShown, setImportantShown ],
      // Menus & Modals
      mobileMenuState: [ mobileMenuOpen, setMobileMenuOpen ],
      modal1State: [ openModal1, setOpenModal1 ],
      // Token 
      tokenState: [ token, setToken ],
      // Is Page Scrolled
      isPageScrolledState: [ isPageScrolled, setIsPageScrolled ]
    } }>

      { children }

    </MiscContext.Provider>
  )
}

export { MiscContext, MiscProvider }
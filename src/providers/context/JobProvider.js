'use client'

import { createContext, useState } from 'react'

const JobContext = createContext()

const JobProvider = ({ children }) =>
{
  const [ job, setJob ] = useState(null)
  const [ calendar, setCalendar ] = useState(null)

  return (
    <JobContext.Provider value={ {
      jobState: [ job, setJob ]
    } }>

      { children }

    </JobContext.Provider>
  )
}

export { JobContext, JobProvider }
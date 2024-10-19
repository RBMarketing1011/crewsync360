'use client'

import { useState, useEffect } from 'react'

import CalendarHeader from '@components/molecule/calendars/CalendarHeader'
import MonthView from '@components/molecule/calendars/MonthView'
import { generateCalendarPeriod } from '@lib/helpers/calendar/genCalendarPeriod'
import Loading from '@components/atom/Loading'
import DayView from '@components/molecule/calendars/DayView'
import WeekView from '@components/molecule/calendars/WeekView'

const CalendarPage = ({ accountId }) =>
{
  const [ calendarView, setCalendarView ] = useState('Day')
  const [ loading, setLoading ] = useState(true)
  const [ date, setDate ] = useState(null)

  const [ dayData, setDayData ] = useState(null)
  const [ weekData, setWeekData ] = useState(null)
  const [ monthData, setMonthData ] = useState(null)
  const [ yearData, setYearData ] = useState(null)


  useEffect(() =>
  {
    setLoading(true)

    const setCalendar = async () =>
    {
      // setDays(initialData)
      setDayData(await generateCalendarPeriod('day', new Date(), accountId))
      setWeekData(await generateCalendarPeriod('week', new Date(), accountId))
      setMonthData(await generateCalendarPeriod('month', new Date(), accountId))
      setYearData(await generateCalendarPeriod('year', new Date(), accountId))
    }

    setCalendar()
    setLoading(false)

  }, [])

  useEffect(() =>
  {
    const currentDay = monthData?.find(day => day.isToday)
    const time = 'T12:00:00Z'

    if (currentDay)
    {
      setDate({
        day: new Date(currentDay.date + time).toLocaleString('en-US', { day: 'numeric' }),
        month: new Date(currentDay.date + time).toLocaleString('en-US', { month: 'long' }),
        year: new Date(currentDay.date).getFullYear()
      })
    }

  }, [ monthData ])

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <CalendarHeader
        calendarView={ { state: calendarView, setState: setCalendarView } }
        heading={ date && `${ calendarView === 'Year' ? '' : date.month } ${ calendarView === 'Day' ? date.day + ',' : '' } ${ date.year }` }
      />

      {
        loading || (!dayData && !weekData && !monthData && !yearData) ?

          <Loading
            title='Loading calendar'
            description='Please wait while we load the calendar...'
          />

          :

          (dayData && weekData && monthData && yearData) &&
            calendarView === 'Day' ?

            <DayView
              days={ dayData }
              month={ monthData }
            />

            :

            calendarView === 'Week' ?

              <WeekView days={ weekData } />

              :

              calendarView === 'Month' &&

              <MonthView days={ monthData } />
      }
    </div>
  )
}

export default CalendarPage
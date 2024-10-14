'use client'

import { useState, useEffect } from 'react'

import
{ ClockIcon } from '@heroicons/react/20/solid'
import { generateCalendarPeriod } from '@lib/helpers/calendar/genCalendarPeriod'

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

const initialData = [
  { date: '2021-12-27', events: [] },
  { date: '2021-12-28', events: [] },
  { date: '2021-12-29', events: [] },
  { date: '2021-12-30', events: [] },
  { date: '2021-12-31', events: [] },
  { date: '2022-01-01', isCurrentMonth: true, events: [] },
  { date: '2022-01-02', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-03',
    isCurrentMonth: true,
    events: [],
  },
  {
    date: '2022-01-04', isCurrentMonth: true, events: [
      { id: 1, name: 'Maple syrup museum', time: '3PM', datetime: '2022-01-22T15:00', href: '#' },
      { id: 2, name: 'Hockey game', time: '7PM', datetime: '2022-01-22T19:00', href: '#' },
      { id: 3, name: 'Maple syrup museum', time: '3PM', datetime: '2022-01-22T15:00', href: '#' },
      { id: 4, name: 'Hockey game', time: '7PM', datetime: '2022-01-22T19:00', href: '#' },
    ]
  },
  { date: '2022-01-05', isCurrentMonth: true, events: [] },
  { date: '2022-01-06', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-07',
    isCurrentMonth: true,
    events: [],
  },
  { date: '2022-01-08', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-09', isCurrentMonth: true, events: []
  },
  { date: '2022-01-10', isCurrentMonth: true, events: [] },
  { date: '2022-01-11', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-12',
    isCurrentMonth: true,
    isToday: true,
    events: [],
  },
  {
    date: '2022-01-13', isCurrentMonth: true, events: []
  },
  { date: '2022-01-14', isCurrentMonth: true, events: [] },
  { date: '2022-01-15', isCurrentMonth: true, events: [] },
  { date: '2022-01-16', isCurrentMonth: true, events: [] },
  { date: '2022-01-17', isCurrentMonth: true, events: [] },
  { date: '2022-01-18', isCurrentMonth: true, events: [] },
  { date: '2022-01-19', isCurrentMonth: true, events: [] },
  { date: '2022-01-20', isCurrentMonth: true, events: [] },
  { date: '2022-01-21', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-22',
    isCurrentMonth: true,
    isSelected: true,
    events: [],
  },
  { date: '2022-01-23', isCurrentMonth: true, events: [] },
  { date: '2022-01-24', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-25', isCurrentMonth: true, events: []
  },
  { date: '2022-01-26', isCurrentMonth: true, events: [] },
  { date: '2022-01-27', isCurrentMonth: true, events: [] },
  { date: '2022-01-28', isCurrentMonth: true, events: [] },
  { date: '2022-01-29', isCurrentMonth: true, events: [] },
  { date: '2022-01-30', isCurrentMonth: true, events: [] },
  { date: '2022-01-31', isCurrentMonth: true, events: [] },
  { date: '2022-02-01', events: [] },
  { date: '2022-02-02', events: [] },
  { date: '2022-02-03', events: [] },
  {
    date: '2022-02-04',
    events: [],
  },
  { date: '2022-02-05', events: [] },
  {
    date: '2022-02-06', events: []
  },
]

const MonthView = ({ accountId }) =>
{
  const [ days, setDays ] = useState(null)

  const [ selectedDay, setSelectedDay ] = useState(null)

  useEffect(() =>
  {
    const setCalendar = async () =>
    {
      // setDays(initialData)
      setDays(await generateCalendarPeriod('month', new Date(), accountId))
    }

    setCalendar()
  }, [])

  const [ tooltip, setTooltip ] = useState({
    visible: false,
    style: {},
  })

  const handleMouseEnter = (e, day) =>
  {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window

    setSelectedDay(day)

    // Determine the quadrant and set tooltip positioning
    const style = {}
    if (clientX > innerWidth / 2 && clientY > innerHeight / 2)
    {
      // Bottom-right quadrant
      style.bottom = `${ innerHeight - clientY * 1.15 }px`
      style.right = `${ innerWidth - clientX * 1.05 }px`
    } else if (clientX > innerWidth / 2 && clientY <= innerHeight / 2)
    {
      // Top-right quadrant
      style.top = `${ clientY / 1.5 }px`
      style.right = `${ innerWidth - clientX - 55 }px`
    } else if (clientX <= innerWidth / 2 && clientY > innerHeight / 2)
    {
      // Bottom-left quadrant
      style.bottom = `${ innerHeight - clientY * 1.15 }px`
      style.left = `${ clientX / 1.5 }px`
    } else
    {
      // Top-left quadrant
      style.top = `${ clientY / 2.5 }px`
      style.left = `${ clientX / 2.5 }px`
    }

    setTooltip({
      visible: true,
      style,
    })
  }

  const handleMouseLeave = () =>
  {
    setTooltip({ ...tooltip, visible: false })
  }

  return (
    <div className='mb-24'>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className={ `${ days?.length <= 35
            ? 'lg:grid-rows-5' : 'lg:grid-rows-6' } 
            relative hidden w-full h-full lg:grid lg:grid-cols-7 lg:gap-px` }>
            { days?.map((day) => (
              <div
                key={ day.date }
                className={ classNames(
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                  'relative px-3 py-2 h-28',
                ) }
                onMouseEnter={ (e) => handleMouseEnter(e, day) }
                onMouseLeave={ () => handleMouseLeave() }
              >
                <time
                  dateTime={ day.date }
                  className={
                    day.isToday
                      ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                      : undefined
                  }
                >
                  { day.date.split('-').pop().replace(/^0/, '') }
                </time>
                { day.events.length > 0 && (
                  <ol className="mt-2">
                    { day.events.slice(0, 2).map((event) => (
                      <li key={ event.id }>
                        <a href={ event.href } className="group flex">
                          <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                            { event.name }
                          </p>
                          <time
                            dateTime={ event.datetime }
                            className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                          >
                            { event.time }
                          </time>
                        </a>
                      </li>
                    )) }
                    { day.events.length > 2 && <li className="text-gray-500">+ { day.events.length - 2 } more</li> }
                  </ol>
                ) }
              </div>
            )) }

            {
              selectedDay?.events.length > 0 && tooltip.visible && (
                <div
                  className={ `hidden px-4 py-10 sm:px-6 lg:block z-[1000] absolute` }
                  style={ tooltip.style }
                  onMouseEnter={ () => setTooltip({ ...tooltip, visible: true }) }
                  onMouseLeave={ () => handleMouseLeave() }
                >
                  <ol className="divide-y divide-gray-100 overflow-x-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
                    <div className="border-b border-gray-200 p-4">
                      <h3 className="text-sm font-bold leading-6 text-sky-700">
                        { new Date(new Date(selectedDay.date).setDate(new Date(selectedDay.date).getDate() + 1)).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) }
                      </h3>
                    </div>
                    { selectedDay.events.map((event) => (
                      <li key={ event.id } className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
                        <div className="flex-auto">
                          <p className="font-semibold text-gray-900">{ event.name }</p>
                          <time dateTime={ event.datetime } className="mt-2 flex items-center text-gray-700">
                            <ClockIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                            { event.time }
                          </time>
                        </div>
                        <a
                          href={ event.href }
                          className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                        >
                          View<span className="sr-only">, { event.name }</span>
                        </a>
                      </li>
                    )) }
                  </ol>
                </div>
              )
            }

          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            { days?.map((day) => (
              <button
                key={ day.date }
                type="button"
                className={ classNames(
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  day.isSelected && 'text-white',
                  !day.isSelected && day.isToday && 'text-indigo-600',
                  !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                  !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-500',
                  'flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10',
                ) }
                onClick={ (e) => handleMouseEnter(e, day) }
              >
                <time
                  dateTime={ day.date }
                  className={ classNames(
                    day.isSelected && 'flex h-6 w-6 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-gray-900',
                    'ml-auto',
                  ) }
                >
                  { day.date.split('-').pop().replace(/^0/, '') }
                </time>
                <span className="sr-only">{ day.events.length } events</span>
                { day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    { day.events.map((event) => (
                      <span key={ event.id } className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                    )) }
                  </span>
                ) }
              </button>
            )) }
          </div>
        </div>
      </div>
      {
        selectedDay?.events.length > 0 && (
          <div className="px-4 py-10 sm:px-6 lg:hidden max-h-48">
            <ol className="divide-y divide-gray-100 rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
              { selectedDay.events.map((event) => (
                <li key={ event.id } className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
                  <div className="flex-auto">
                    <p className="font-semibold text-gray-900">{ event.name }</p>
                    <time dateTime={ event.datetime } className="mt-2 flex items-center text-gray-700">
                      <ClockIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                      { event.time }
                    </time>
                  </div>
                  <a
                    href={ event.href }
                    className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                  >
                    View<span className="sr-only">, { event.name }</span>
                  </a>
                </li>
              )) }
            </ol>
          </div>
        )
      }
    </div>
  )
}

export default MonthView
'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, } from '@heroicons/react/20/solid'
import { v4 } from 'uuid'

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

const events = [
  { id: 1, name: 'Design review', time: '10:00 AM', datetime: '2024-10-18T10:00', hours: 1.5 },
  { id: 2, name: 'IT Meeting', time: '11:00 AM', datetime: '2024-10-18T11:30', hours: 1 },
  { id: 3, name: 'Website Review', time: '2:00 PM', datetime: '2024-10-18T14:00', hours: 2 },
  { id: 4, name: 'Sales meeting', time: '5:00 PM', datetime: '2024-10-18T17:00', hours: 3.25 },
]

const dayHrs = Array.from({ length: 24 }, (_, i) =>
{
  const hour = i % 12 === 0 ? 12 : i % 12
  const period = i < 12 ? 'AM' : 'PM'
  return `${ hour } ${ period }`
})

const DayView = ({ days, month }) =>
{
  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)

  const [ job, setJob ] = useState(null)

  useEffect(() =>
  {
    const currentMinute = new Date().getHours() * 60
    container.current.scrollTop =
      ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
        currentMinute) /
      1440
  }, [])

  const getRowNumber = (time) =>
  {
    const [ hours, minutesPart ] = time.split(/[: ]/)
    const isPM = time.includes('PM')
    const hours24 = isPM && hours !== '12' ? parseInt(hours) + 12 : parseInt(hours)
    const minutes = parseInt(minutesPart)
    const totalMinutes = hours24 * 60 + minutes
    return Math.floor(totalMinutes / 5) + 1 // +1 to account for the 1-based row system
  }

  const getSpan = (duration) => Math.ceil(duration * 60 / 5)



  return (
    <div className="flex h-full max-h-[75vh] overflow-hidden flex-col px-2">
      <div className="isolate flex flex-auto bg-white">
        <div
          ref={ container }
          className="flex flex-auto flex-col h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-sky-700 scrollbar-track-sky-100">
          <div
            ref={ containerNav }
            className="grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden"
          >
            <button type="button" className="flex flex-col items-center pb-1.5 pt-3">
              <span>W</span>
              {/* Default: "text-gray-900", Selected: "bg-gray-900 text-white", Today (Not Selected): "text-sky-600", Today (Selected): "bg-sky-600 text-white" */ }
              <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
                19
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pb-1.5 pt-3">
              <span>T</span>
              <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-sky-600">
                20
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pb-1.5 pt-3">
              <span>F</span>
              <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
                21
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pb-1.5 pt-3">
              <span>S</span>
              <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-base font-semibold text-white">
                22
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pb-1.5 pt-3">
              <span>S</span>
              <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
                23
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pb-1.5 pt-3">
              <span>M</span>
              <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
                24
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pb-1.5 pt-3">
              <span>T</span>
              <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
                25
              </span>
            </button>
          </div>
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none bg-white ring-1 ring-gray-200" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */ }
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-200"
                style={ { gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' } }
              >
                <div ref={ containerOffset } className="row-end-1 h-7"></div>

                {
                  dayHrs.map(hour => (

                    <Fragment key={ v4() }>
                      <div>
                        <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          { hour }
                        </div>
                      </div>
                      <div />
                    </Fragment>

                  ))
                }
              </div>

              {/* Events */ }
              <ol
                className="relative col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                style={ { gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' } }
              >
                {
                  events.map((event, index) => (
                    <li
                      key={ event.id }
                      className="absolute mt-px flex w-full h-full"
                      style={ {
                        gridRow: `${ getRowNumber(event.time) } / span ${ getSpan(event.hours) }`,
                        zIndex: index + 1 // Increment z-index for each event to stack properly
                      } }
                    >
                      <button
                        type='button'
                        className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-sky-500/10 p-2 text-xs leading-5 hover:bg-sky-500/20 outline outline-sky-100"
                        onClick={ () => setJob(event) }
                      >
                        <p className="order-1 font-semibold text-sky-700">{ event.name }</p>
                        <p className="text-sky-500 group-hover:text-sky-700">
                          <time dateTime={ event.datetime }>{ event.time }</time>
                        </p>
                      </button>
                    </li>
                  ))
                }
              </ol>

            </div>
          </div>
        </div>
        <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
          <div className="w-full max-w-sm fixed top-24 mt-14">
            <div className="flex items-center text-center text-gray-900">
              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="flex-auto text-sm font-semibold">January 2022</div>
              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">

              {
                month.map((day, dayIdx) => (

                  <button
                    key={ day.date }
                    type="button"
                    className={ classNames(
                      'py-1.5 hover:bg-gray-100 focus:z-10',
                      day.isCurrentMonth ? 'bg-white' : 'bg-gray-100',
                      (day.isSelected || day.isToday) && 'font-semibold',
                      day.isSelected && 'text-white',
                      !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                      !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                      day.isToday && !day.isSelected && 'text-white',
                      dayIdx === 0 && 'rounded-tl-lg',
                      dayIdx === 6 && 'rounded-tr-lg',
                      dayIdx === days.length - 7 && 'rounded-bl-lg',
                      dayIdx === days.length - 1 && 'rounded-br-lg',
                    ) }
                  >
                    <time
                      dateTime={ day.date }
                      className={ classNames(
                        'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                        day.isToday && 'bg-sky-600',
                      ) }
                    >
                      { day.date.split('-').pop().replace(/^0/, '') }
                    </time>
                  </button>

                ))
              }
            </div>
            {
              job &&

              <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white mt-6 shadow-[0_0_8px_lightgray] px-4">
                <div className="py-2">
                  Job Details
                </div>
                {/* Content goes here */ }
                <div>
                  <dl className="divide-y divide-gray-100">
                    <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                        { job.name }
                      </dd>
                    </div>
                    <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
                        Time
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                        { job.time }
                      </dd>
                    </div>
                    <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
                        Estimated hours
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                        { job.hours }
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayView
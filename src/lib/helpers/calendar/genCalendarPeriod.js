// Helper function to format the date
const formatDate = (date) =>
{
  return `${ date.getFullYear() }-${ String(date.getMonth() + 1).padStart(2, '0') }-${ String(date.getDate()).padStart(2, '0') }`
}

const fetchEventsForPeriod = async (accountId, startDate, endDate) =>
{
  // Create an array of all dates in the specified range
  const start = new Date(startDate)
  const end = new Date(endDate)
  const days = []

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1))
  {
    days.push({ date: formatDate(d), events: [] }) // Initialize each date with an empty events array
  }

  try
  {
    const req = await fetch(`${ process.env.NEXT_PUBLIC_DOMAIN }/api/v1/account/${ accountId }/jobs?startDate=${ startDate }&endDate=${ endDate }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const res = await req.json() // Assume this returns an array of job objects

    console.log(res)

    if (res.success)
    {
      // Format the job objects into the required event structure
      res.success.map((job) =>
      {
        const jobDate = formatDate(new Date(job.date)) // Assume job.date is the date of the job

        // Find the corresponding day in the days array
        const day = days.find((day) => day.date === jobDate)
        if (day)
        {
          // Push the job details into the events array for the matching date
          day.events.push({
            id: job.id,
            name: job.name,
            time: job.time, // Adjust based on your job object structure
            datetime: job.dateTime, // Adjust based on your job object structure
            href: job.href, // Adjust based on your job object structure
          })
        }
      })

    } else if (res.error)
    {
      throw new Error(res.error)
    }

    return days // Return the formatted days array

  } catch (error)
  {
    console.error('Error fetching events:', error)
    throw error // Re-throw the error if you want it to propagate further
  }
}


export const generateCalendarPeriod = async (period, referenceDate, accountId) =>
{
  const generateDaysForMonth = async (year, month) =>
  {
    const days = []
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)

    const startOfMonth = new Date(year, month, 1 - firstDayOfMonth.getDay())
    const endOfMonth = new Date(year, month + 1, 6 - lastDayOfMonth.getDay())

    const eventsData = await fetchEventsForPeriod(accountId, formatDate(startOfMonth), formatDate(endOfMonth))
    const eventsMap = eventsData.reduce((acc, { date, events }) =>
    {
      acc[ date ] = events
      return acc
    }, {})

    let currentDate = startOfMonth
    while (currentDate <= endOfMonth)
    {
      const dateStr = formatDate(currentDate)
      const isCurrentMonth = currentDate.getMonth() === month
      const isToday = currentDate.toDateString() === new Date().toDateString()

      days.push({
        date: dateStr,
        isCurrentMonth,
        isToday,
        events: eventsMap[ dateStr ] || [],
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return days
  }

  const generateDaysForWeek = async (referenceDate) =>
  {
    const days = []
    const startOfWeek = new Date(referenceDate)
    startOfWeek.setDate(referenceDate.getDate() - referenceDate.getDay())

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)

    const eventsData = await fetchEventsForPeriod(accountId, formatDate(startOfWeek), formatDate(endOfWeek))
    const eventsMap = eventsData.reduce((acc, { date, events }) =>
    {
      acc[ date ] = events
      return acc
    }, {})

    for (let i = 0; i < 7; i++)
    {
      const currentDate = new Date(startOfWeek)
      currentDate.setDate(startOfWeek.getDate() + i)
      const dateStr = formatDate(currentDate)
      const isToday = currentDate.toDateString() === new Date().toDateString()

      days.push({
        date: dateStr,
        isToday,
        events: eventsMap[ dateStr ] || [],
      })
    }

    return days
  }

  const generateDaysForDay = async (referenceDate) =>
  {
    const dateStr = formatDate(referenceDate)
    const eventsData = await fetchEventsForPeriod(accountId, dateStr, dateStr)
    return [
      {
        date: dateStr,
        isToday: true,
        events: eventsData[ 0 ]?.events || [],
      },
    ]
  }

  const generateDaysForYear = async (year) =>
  {
    const days = []
    const startOfYear = new Date(year, 0, 1)
    const endOfYear = new Date(year, 11, 31)

    const eventsData = await fetchEventsForPeriod(accountId, formatDate(startOfYear), formatDate(endOfYear))
    const eventsMap = eventsData.reduce((acc, { date, events }) =>
    {
      acc[ date ] = events
      return acc
    }, {})

    for (let month = 0; month < 12; month++)
    {
      const monthDays = await generateDaysForMonth(year, month)
      days.push(...monthDays)
    }

    return days.map((day) => ({
      ...day,
      events: eventsMap[ day.date ] || [],
    }))
  }

  const year = referenceDate.getFullYear()
  const month = referenceDate.getMonth()

  switch (period)
  {
    case 'day':
      return generateDaysForDay(referenceDate)
    case 'week':
      return generateDaysForWeek(referenceDate)
    case 'month':
      return generateDaysForMonth(year, month)
    case 'year':
      return generateDaysForYear(year)
    default:
      throw new Error("Invalid period. Please use 'day', 'week', 'month', or 'year'.")
  }
}

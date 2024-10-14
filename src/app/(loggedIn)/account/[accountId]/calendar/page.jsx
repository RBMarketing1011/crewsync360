import CalendarPage from '@components/page/account/calendar/CalendarPage'

const Calendar = ({ params }) =>
{
  const { accountId } = params

  return (
    <CalendarPage accountId={ accountId } />
  )
}

export default Calendar
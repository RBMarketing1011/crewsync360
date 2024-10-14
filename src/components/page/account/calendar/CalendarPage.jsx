import CalendarHeader from '@components/molecule/calendars/CalendarHeader'
import MonthView from '@components/molecule/calendars/MonthView'

const CalendarPage = ({ accountId }) =>
{
  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <CalendarHeader />
      <MonthView accountId={ accountId } />
    </div>
  )
}

export default CalendarPage
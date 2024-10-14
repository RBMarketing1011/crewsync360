import AccountDashboardPage from '@components/page/account/dashboard/AccountDashboardPage'


const Dashboard = ({ params }) =>
{
  const { accountId } = params

  return (
    <>
      <AccountDashboardPage
        accountId={ accountId }
      />
    </>
  )
}

export default Dashboard
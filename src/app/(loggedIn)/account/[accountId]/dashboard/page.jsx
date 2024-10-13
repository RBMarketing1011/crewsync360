import AccountDashboardPage from '@components/page/account/dashboard/AccountDashboardPage'
import PageHeadingWithBreadcrumbs from '@components/molecule/PageHeadingWithBreadcrumbs'


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
import AccountDashboardPage from '@components/page/account/dashboard/AccountDashboardPage'
import PageHeadingWithBreadcrumbs from '@components/molecule/PageHeadingWithBreadcrumbs'


const Dashboard = ({ params }) =>
{
  const { accountId } = params

  return (
    <>
      <PageHeadingWithBreadcrumbs
        title='Dashboard'
        accountId={ accountId }
      />
      <AccountDashboardPage
        accountId={ accountId }
      />
    </>
  )
}

export default Dashboard
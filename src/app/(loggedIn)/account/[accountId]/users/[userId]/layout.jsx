import UserTabs from '@components/organism/backend/UserTabs'

const Layout = ({ children, params }) =>
{
  const { accountId, userId } = params

  return (
    <main>
      <UserTabs accountId={ accountId } userId={ userId } />
      <div className='py-5'>
        { children }
      </div>
    </main>
  )
}

export default Layout
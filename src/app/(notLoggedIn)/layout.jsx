import Navbar from '@components/organism/frontend/Navbar'

export const metadata = {
  title: 'Add Title Here',
  description: 'Add Description Here'
}

const Layout = ({ children }) =>
{
  return (
    <main>
      <Navbar />
      { children }
    </main>
  )
}

export default Layout
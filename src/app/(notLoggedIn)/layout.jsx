import Footer from '@components/organism/frontend/Footer'
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
      <Footer />
    </main>
  )
}

export default Layout
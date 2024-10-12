import Blog from '@components/organism/frontend/Home/Blog'
import Contact from '@components/organism/frontend/Home/Contact'
import Content from '@components/organism/frontend/Home/Content'
import CTA1 from '@components/organism/frontend/Home/CTA1'
import CTA2 from '@components/organism/frontend/Home/CTA2'
import Features from '@components/organism/frontend/Home/Features'
import HeroSection from '@components/organism/frontend/Home/Hero'
import Pricing from '@components/organism/frontend/Home/Pricing'
import Subscribe from '@components/organism/frontend/Home/Subscribe'

const Home = () =>
{
  return (
    <main>
      <HeroSection />
      <Features />
      <CTA1 />
      <Pricing />
      <Contact />
      <CTA2 />
      <Content />
      <Blog />
    </main>
  )
}

export default Home
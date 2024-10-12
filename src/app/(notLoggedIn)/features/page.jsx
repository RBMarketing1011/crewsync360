import FeaturesHero from '@components/organism/frontend/Features/FeaturesHero'
import Stats from '@components/organism/frontend/Features/Stats'
import Usage from '@components/organism/frontend/Features/Usage'

const FeaturesPage = () =>
{
  return (
    <main>
      <FeaturesHero />
      <Usage />
      <Stats />
    </main>
  )
}

export default FeaturesPage
import ContactCards from '@components/organism/frontend/Contact/ContactCards'
import ContactForm from '@components/organism/frontend/Contact/ContactForm'
import ContactHero from '@components/organism/frontend/Contact/ContactHero'

const ContactPage = () =>
{
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <ContactCards />
    </main>
  )
}

export default ContactPage
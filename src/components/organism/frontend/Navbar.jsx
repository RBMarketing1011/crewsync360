'use client'

import { useState, useEffect, useContext } from 'react'
import { MiscContext } from '@providers/context/MiscProvider'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const navigation = [
  { name: 'About Us', href: '/about' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
  { name: 'News', href: '/news' },
]

const Navbar = () =>
{
  const { mobileMenuState } = useContext(MiscContext)
  const [ mobileMenuOpen, setMobileMenuOpen ] = mobileMenuState
  const [ isScrolled, setIsScrolled ] = useState(false)

  useEffect(() =>
  {
    const handleScroll = () =>
    {
      if (window.scrollY > 50)
      {
        setIsScrolled(true)
      } else
      {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () =>
    {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={ `fixed top-0 w-full z-[1000] md:px-10 transition-all duration-300 
        ${ isScrolled
          ? 'bg-white'
          :
          'bg-transparent' }` }
    >
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex items-center gap-x-12">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              alt=""
              src="/images/mark.svg"
              className="h-8 w-auto"
              width={ 0 }
              height={ 0 }
              sizes='100vw'
            />
          </a>
          <div className="hidden lg:flex lg:gap-x-12">
            { navigation.map((item) => (
              <a key={ item.name } href={ item.href } className="text-sm font-semibold leading-6 text-gray-900">
                { item.name }
              </a>
            )) }
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={ () => setMobileMenuOpen(true) }
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex items-center gap-x-5">
          <a href="/auth/register" className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Get Started Now
          </a>
          <a href="/auth/login" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog open={ mobileMenuOpen } onClose={ setMobileMenuOpen } className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                alt=""
                src="/images/mark.svg"
                className="h-8 w-auto"
                width={ 0 }
                height={ 0 }
                sizes='100vw'
              />
            </a>
            <button
              type="button"
              onClick={ () => setMobileMenuOpen(false) }
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                { navigation.map((item) => (
                  <a
                    key={ item.name }
                    href={ item.href }
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    { item.name }
                  </a>
                )) }
              </div>
              <div className="py-6">
                <a
                  href="/auth/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>

                <a
                  href="/auth/register"
                  className="-mx-3 mt-2 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

export default Navbar

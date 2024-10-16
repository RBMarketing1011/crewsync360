'use client'

import { useContext, useEffect } from 'react'
import { NewUserScreenContext } from '@providers/context/NewUserScreenProvider'
import { UserContext } from '@providers/context/UserProvider'
import Image from 'next/image'
import { parseSingleImageData } from '@lib/helpers/fs/images/parseSingleImageData'

const VerifyUserDetails = () =>
{
  const {
    userInfoState
  } = useContext(NewUserScreenContext)

  const [ userInfo, setUserInfo ] = userInfoState

  const { sessionState } = useContext(UserContext)

  const [ session, update ] = sessionState

  useEffect(() =>
  {
    session && setUserInfo(prev => ({
      ...prev,
      firstname: session?.user?.firstname,
      lastname: session?.user?.lastname,
      email: session?.user?.email,
      phone: session?.user?.phone,
      image: session?.user?.image,
      bio: session?.user?.bio
    }))
  }, [])

  return (
    <div className='w-full'>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Verify User Details
      </h2>
      <div className='w-full gap-y-5 grid grid-cols-2 gap-x-4'>

        <div className='col-span-2 md:col-span-1'>
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={ userInfo.firstname }
            onChange={ (e) => setUserInfo(prev => ({
              ...prev,
              firstname: e.target.value
            })) }
          />
        </div>
        <div className='col-span-2 md:col-span-1'>
          <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={ userInfo.lastname }
            onChange={ (e) => setUserInfo(prev => ({
              ...prev,
              lastname: e.target.value
            })) }
          />
        </div>
        <div className='col-span-2 md:col-span-1'>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={ userInfo.email }
            onChange={ (e) => setUserInfo(prev => ({
              ...prev,
              email: e.target.value
            })) }
          />
        </div>
        <div className='col-span-2 md:col-span-1'>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={ userInfo.phone }
            onChange={ (e) => setUserInfo(prev => ({
              ...prev,
              phone: e.target.value
            })) }
          />
        </div>
        <div className='col-span-2 md:col-span-1'>
          <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePic"
            id="profilePic"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 hover:file:cursor-pointer"
            onChange={ async (e) =>
            {
              const image = await parseSingleImageData(e)

              setUserInfo(prev => ({
                ...prev,
                image
              }))
            } }
          />
        </div>
        <div className='col-span-2 md:col-span-1 flex justify-center items-center'>
          { console.log(userInfo.image) }
          {
            userInfo?.image &&
            <div className='w-20 h-20 rounded-full overflow-hidden'>
              <Image
                src={ userInfo.image }
                alt="Profile Pic"
                className='w-full h-full object-cover object-center'
                width={ 0 }
                height={ 0 }
                sizes='100vw'
              />
            </div>
          }
        </div>
        <div className='col-span-2'>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            rows="5"
            placeholder='Tell us about yourself...'
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={ userInfo.bio }
            onChange={ (e) => setUserInfo(prev => ({
              ...prev,
              bio: e.target.value
            })) }
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default VerifyUserDetails
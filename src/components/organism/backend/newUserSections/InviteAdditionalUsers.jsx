'use client'

import { useContext } from 'react'
import { NewUserScreenContext } from '@providers/context/NewUserScreenProvider'
import { UserContext } from '@providers/context/UserProvider'
import { toast } from 'react-toastify'

const InviteAdditionalUsers = () =>
{
  const { sessionState } = useContext(UserContext)
  const [ session, update ] = sessionState

  const { addUserState } = useContext(NewUserScreenContext)
  const [ addUser, setAddUser ] = addUserState

  const submitAddUserForm = async (e) =>
  {
    e.preventDefault()

    try
    {
      const req = await fetch(`/api/v1/account/${ session?.account?._id }/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addUser)
      })

      const res = await req.json()

      if (res.error) throw new Error(res.error)

      update()

    } catch (error)
    {
      toast.error(error.message)
    }

    setAddUser({
      firstname: '',
      lastname: '',
      email: '',
      role: '',
    })
  }

  return (
    <div className='w-full'>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Invite Additional Users
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
            value={ addUser.firstname }
            onChange={ (e) => setAddUser(prev => ({
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
            value={ addUser.lastname }
            onChange={ (e) => setAddUser(prev => ({
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
            value={ addUser.email }
            onChange={ (e) => setAddUser(prev => ({
              ...prev,
              email: e.target.value
            })) }
          />
        </div>
        <div className='col-span-2 md:col-span-1'>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            id="role"
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={ addUser.role }
            onChange={ (e) => setAddUser(prev => ({
              ...prev,
              role: e.target.value
            })) }
          >
            <option value="" disabled>Select a role</option>
            <option value="employee">Employee</option>
            <option value="lead">Lead</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="col-span-full flex justify-end">
          <button
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            onClick={ submitAddUserForm }
          >
            Invite User
          </button>
        </div>
      </div>

      {
        session?.account?.users.length > 0 &&

        <table className="w-full bg-gray-400 max-h-[270px] overflow-y-auto divide-y divide-gray-300 mt-6">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Name
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">

            {
              session?.account?.users.map((person) => (

                <tr key={ person.email }>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    { person.firstname } { person.lastname }
                  </td>
                  <td className="whitespace-nowrap max-w-[200px] px-3 py-4 text-sm text-gray-500 truncate">
                    { person.email }
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    { person.role }
                  </td>
                </tr>

              ))
            }

          </tbody>
        </table>

      }

    </div>
  )
}

export default InviteAdditionalUsers
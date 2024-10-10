'use client'

import { useContext } from 'react'
import { NewUserScreenContext } from '@providers/context/NewUserScreenProvider'

const VerifyCompanyDetails = () =>
{
  const {
    companyInfoState
  } = useContext(NewUserScreenContext)

  const [ companyInfo, setCompanyInfo ] = companyInfoState

  return (
    <div className='w-full'>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Verify Company Details
      </h2>
      <div className='w-full gap-y-5 grid grid-cols-2 gap-x-4'>
        <div className='col-span-2'>
          <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="company-name"
            id="company-name"
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={ companyInfo.companyName }
            onChange={ (e) => setCompanyInfo(prev => ({
              ...prev,
              companyName: e.target.value
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
            value={ companyInfo.email }
            onChange={ (e) => setCompanyInfo(prev => ({
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
            value={ companyInfo.phone }
            onChange={ (e) => setCompanyInfo(prev => ({
              ...prev,
              phone: e.target.value
            })) }
          />
        </div>
        <div className='col-span-2 md:col-span-1'>
          <label htmlFor="address1" className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            name="address1"
            id="address1"
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={ companyInfo.companyAddress.address1 }
            onChange={ (e) => setCompanyInfo(prev => ({
              ...prev,
              companyAddress: {
                ...prev.companyAddress,
                address1: e.target.value
              }
            })) }
          />
        </div>
        <div className='col-span-2 md:col-span-1'>
          <label htmlFor="address2" className="block text-sm font-medium text-gray-700">
            Apt/Suite #
          </label>
          <input
            type="text"
            name="address2"
            id="address2"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={ companyInfo.companyAddress.address2 }
            onChange={ (e) => setCompanyInfo(prev => ({
              ...prev,
              companyAddress: {
                ...prev.companyAddress,
                address2: e.target.value
              }
            })) }
          />
        </div>

        <div className='col-span-full grid grid-cols-3 gap-3'>
          <div className='col-span-3 sm:col-span-1'>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              required
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={ companyInfo.companyAddress.city }
              onChange={ (e) => setCompanyInfo(prev => ({
                ...prev,
                companyAddress: {
                  ...prev.companyAddress,
                  city: e.target.value
                }
              })) }
            />
          </div>
          <div className='col-span-3 sm:col-span-1'>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              name="state"
              id="state"
              required
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={ companyInfo.companyAddress.state ?
                companyInfo.companyAddress.state
                :
                'blank' }
              onChange={ (e) => setCompanyInfo(prev => ({
                ...prev,
                companyAddress: {
                  ...prev.companyAddress,
                  state: e.target.value
                }
              })) }
            >
              <option value="blank" disabled>Select a state</option>
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AZ">AZ</option>
              <option value="AR">AR</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="IA">IA</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="ME">ME</option>
              <option value="MD">MD</option>
              <option value="MA">MA</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MS">MS</option>
              <option value="MO">MO</option>
              <option value="MT">MT</option>
              <option value="NE">NE</option>
              <option value="NV">NV</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NY">NY</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WV">WV</option>
              <option value="WI">WI</option>
              <option value="WY">WY</option>
            </select>
          </div>
          <div className='col-span-3 sm:col-span-1'>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
              Zip
            </label>
            <input
              type="text"
              name="zip"
              id="zip"
              required
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={ companyInfo.companyAddress.zip }
              onChange={ (e) => setCompanyInfo(prev => ({
                ...prev,
                companyAddress: {
                  ...prev.companyAddress,
                  zip: e.target.value
                }
              })) }
            />
          </div>
        </div>

        <div className='col-span-2'>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            type="url"
            name="website"
            id="website"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={ companyInfo.website }
            onChange={ (e) => setCompanyInfo(prev => ({
              ...prev,
              website: e.target.value
            })) }
          />
        </div>
        <div className='col-span-2'>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="3"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={ companyInfo.description }
            onChange={ (e) => setCompanyInfo(prev => ({
              ...prev,
              description: e.target.value
            })) }
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default VerifyCompanyDetails
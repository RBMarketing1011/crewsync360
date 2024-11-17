'use client'

import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { useEffect, useRef, useState } from 'react'

const AddressInputComponent = ({ onPlaceSelect, value, setValue, errors, setErrors, errorValue }) =>
{
  const [ placeAutocomplete, setPlaceAutocomplete ] = useState(null)
  const inputRef = useRef(null)
  const places = useMapsLibrary("places")

  useEffect(() =>
  {
    if (!places || !inputRef.current) return

    const options = {
      fields: [ "geometry", "name", "formatted_address", "address_components" ],
      types: [ "address" ],
      componentRestrictions: { country: "us" }
    }

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options))
  }, [ places ])

  useEffect(() =>
  {
    if (!placeAutocomplete) return

    placeAutocomplete.addListener("place_changed", () =>
    {
      onPlaceSelect(placeAutocomplete.getPlace())
    })
  }, [ onPlaceSelect, placeAutocomplete ])

  return (
    <>
      <label
        htmlFor="address1"
        className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900"
      >
        Street Address
      </label>
      <input
        id="address1"
        name="address1"
        type="text"
        placeholder="123 Main Street"
        className={ `${ errors.includes(errorValue) ? 'ring-2 ring-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6` }
        ref={ inputRef }
        value={ value }
        onChange={ (e) =>
        {
          const newValue = e.target.value
          setValue(e)
          setErrors(prev =>
          {
            if (newValue && prev.includes(errorValue))
            {
              return prev.filter(error => error !== errorValue)
            }

            return prev
          })
        } }
      />
      {
        errors.includes(errorValue) &&

        <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
          <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
        </div>
      }
    </>
  )
}

export default AddressInputComponent;






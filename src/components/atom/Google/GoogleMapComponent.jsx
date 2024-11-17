'use client'

import { useEffect, useState } from 'react'
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps'
import { v4 } from 'uuid'

const GoogleMapComponent = ({ address, height, offsetZoom }) =>
{
  const [ coordinates, setCoordinates ] = useState(null)

  useEffect(() =>
  {
    if (!window.google)
    {
      console.error('Google Maps API is not loaded.')
      return
    }

    const geocoder = new window.google.maps.Geocoder()

    geocoder.geocode({ address }, (results, status) =>
    {
      if (status === 'OK' && results.length > 0)
      {
        const { lat, lng } = results[ 0 ].geometry.location
        setCoordinates({ lat: lat(), lng: lng() })
      } else
      {
        console.error('Geocoding failed: ' + status)
      }
    })
  }, [ address ])

  return (
    <>
      {
        coordinates &&

        <div style={ { width: '100%', height: `${ height }` } }>
          <Map
            defaultZoom={ 10 }
            zoom={ 10 + offsetZoom }
            defaultCenter={ coordinates }
            mapId={ v4() }
          >
            <AdvancedMarker position={ coordinates }>
              <Pin background={ '#0ea5e9' } glyphColor={ '#0369a1' } borderColor={ '#0369a1' } />
            </AdvancedMarker>
          </Map>
        </div>
      }
    </>
  )
}

export default GoogleMapComponent

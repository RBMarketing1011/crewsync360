import { APIProvider } from '@vis.gl/react-google-maps'

const GoogleAPIProvider = ({ children }) =>
{
  return (
    <APIProvider
      apiKey={ process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }
    >
      { children }
    </APIProvider>
  )
}

export default GoogleAPIProvider
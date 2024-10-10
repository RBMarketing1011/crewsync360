"use client"

import { clientLog } from '@lib/helpers/winston/clientLog'
import Error from "next/error"
import { useEffect } from "react"

export default function GlobalError ({ error })
{
  useEffect(() =>
  {
    clientLog(error.message)
  }, [ error ])

  return (
    <html>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <Error statusCode={ 0 } />
      </body>
    </html>
  )
}
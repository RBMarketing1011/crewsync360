'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'

const BackButton = () =>
{
  const router = useRouter()

  return (
    <button
      className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
      onClick={ () => router.back() }
    >
      <ChevronLeftIcon aria-hidden="true" className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" />
      Back
    </button>
  )
}

export default BackButton
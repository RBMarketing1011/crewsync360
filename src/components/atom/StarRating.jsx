import { StarIcon as SolidStarIcon } from '@heroicons/react/20/solid'
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline'

const Rating = ({ average }) =>
{
  return (
    <div className="flex items-center">
      { [ 0, 1, 2, 3, 4 ].map((rating) =>
      {
        // Full star if the average is greater than the rating index
        if (average >= rating + 1)
        {
          return (
            <SolidStarIcon
              key={ rating }
              aria-hidden="true"
              className="text-yellow-400 h-5 w-5 flex-shrink-0"
            />
          )
        }

        // Half star if the average is between the rating index and the next index
        if (average > rating && average < rating + 1)
        {
          return (
            <div key={ rating } className="relative">
              <SolidStarIcon
                aria-hidden="true"
                className="text-yellow-400 h-5 w-5 flex-shrink-0"
                style={ { clipPath: `inset(0 ${ 100 - (average - rating) * 100 }% 0 0)` } }
              />
              <OutlineStarIcon
                aria-hidden="true"
                className="absolute top-0 left-0 text-gray-300 h-5 w-5 flex-shrink-0"
              />
            </div>
          )
        }

        // Empty star otherwise
        return (
          <OutlineStarIcon
            key={ rating }
            aria-hidden="true"
            className="text-gray-300 h-5 w-5 flex-shrink-0"
          />
        )
      }) }
    </div>
  )
}

export default Rating

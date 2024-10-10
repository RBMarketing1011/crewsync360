import BackButton from '@components/atom/BackButton'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

const PageHeadingWithBreadcrumbs = ({ title, accountId, breadcrumbs }) =>
{
  return (
    <div>
      <div>
        <nav aria-label="Back" className="sm:hidden">
          <BackButton />
        </nav>
        <nav aria-label="Breadcrumb" className="hidden sm:flex">
          <ol role="list" className="flex items-center space-x-4">

            <li>
              <div className="flex">
                <a href={ `/account/${ accountId }/dashboard` } className="text-sm font-medium text-gray-500 hover:text-gray-700">
                  <HomeIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                </a>
              </div>
            </li>

            {
              breadcrumbs &&
              breadcrumbs.map(({ name, href }, index) =>
              (
                <li key={ index }>
                  <div className="flex items-center">
                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <a href={ href } className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                      { name }
                    </a>
                  </div>
                </li>
              ))
            }

          </ol>
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-center md:justify-between border-b border-gray-200 pb-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            { title }
          </h2>
        </div>
      </div>
    </div>
  )
}

export default PageHeadingWithBreadcrumbs
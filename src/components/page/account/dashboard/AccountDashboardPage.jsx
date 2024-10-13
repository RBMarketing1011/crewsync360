'use client'

import { StarIcon } from '@heroicons/react/20/solid'
import { FolderArrowDownIcon } from '@heroicons/react/24/outline'
import ColorTabs from '@components/atom/ColorTabs'
import LineChart from '@components/atom/charts/LineChart'
import DoughnutChart from '@components/atom/charts/DoughnutChart'
import BarChart from '@components/atom/charts/BarChart'
import HorizontalBarChart from '@components/atom/charts/HorizontalBarChart'
import AreaChart from '@components/atom/charts/AreaChart'
import PolarChart from '@components/atom/charts/PolarChart'
import RadarChart from '@components/atom/charts/RadarChart'
import Accordion from '@components/atom/Accordian'

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
}

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

const accordianItems = [
  {
    title: 'Customer Reviews',
    content: <div>
      <div className="mt-3 flex items-center">
        <div>
          <div className="flex items-center">
            { [ 0, 1, 2, 3, 4 ].map((rating) => (
              <StarIcon
                key={ rating }
                aria-hidden="true"
                className={ classNames(
                  reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                  'h-5 w-5 flex-shrink-0',
                ) }
              />
            )) }
          </div>
          <p className="sr-only">{ reviews.average } out of 5 stars</p>
        </div>
        <p className="ml-2 text-sm text-gray-900">Based on { reviews.totalCount } reviews</p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Review data</h3>

        <dl className="space-y-3">
          { reviews.counts.map((count) => (
            <div key={ count.rating } className="flex items-center text-sm">
              <dt className="flex flex-1 items-center">
                <p className="w-3 font-medium text-gray-900">
                  { count.rating }
                  <span className="sr-only"> star reviews</span>
                </p>
                <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                  <StarIcon
                    aria-hidden="true"
                    className={ classNames(
                      count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                      'h-5 w-5 flex-shrink-0',
                    ) }
                  />

                  <div className="relative ml-3 flex-1">
                    <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                    { count.count > 0 ? (
                      <div
                        style={ { width: `calc(${ count.count } / ${ reviews.totalCount } * 100%)` } }
                        className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                      />
                    ) : null }
                  </div>
                </div>
              </dt>
              <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                { Math.round((count.count / reviews.totalCount) * 100) }%
              </dd>
            </div>
          )) }
        </dl>
      </div>
      <a
        href="#"
        className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
      >
        View Customer Reviews
      </a>
    </div>
  },
  {
    title: 'Crew Availability',
    content: <div>
      <div>
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
              Assigned
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
              2
            </dd>
          </div>
          <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
              Available
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
              4
            </dd>
          </div>
          <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">
              On Leave
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
              1
            </dd>
          </div>
        </dl>
      </div>
      <a
        href="#"
        className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
      >
        View All Crew
      </a>
    </div>,
  },
  {
    title: 'Revenue',
    content: 'Create a new invoice',
  },
  {
    title: 'Metrics',
    content: 'Create a new job',
  },
]


const AccountDashboardPage = ({ accountId }) =>
{
  const navigation = [
    { name: 'Overview', href: `/account/${ accountId }/dashboard` },
    { name: 'Operations', href: `/account/${ accountId }/dashboard/operations` },
    { name: 'Leads', href: `/account/${ accountId }/dashboard/leads` },
    { name: 'Financials', href: `/account/${ accountId }/dashboard/financials` },
  ]

  return (
    <>
      <div className='sticky top-16 p-3 z-40 -mx-3  bg-white border-b border-gray-200 flex items-center justify-between'>
        <ColorTabs
          tabs={ navigation }
        />
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition-all ease-in-out"
        >
          <FolderArrowDownIcon aria-hidden="true" className="-ml-0.5 h-5 w-5" />
          Download CSV
        </button>
      </div>


      <div className="flex items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-0">

        <main className="flex-1 w-full lg:w-[40vw] space-y-8 mb-20 -mt-1">
          {/* Main area */ }
          <section className="p-6 rounded-md shadow-[0_0_10px_lightgray]">
            <div className="md:flex md:items-center md:justify-between border-b border-gray-200 pb-5 mb-5">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                  Job Status
                </h2>
              </div>
            </div>
            <LineChart />
          </section>
          <section className="p-6 rounded-md shadow-[0_0_10px_lightgray]">
            <div className="md:flex md:items-center md:justify-between border-b border-gray-200 pb-5 mb-5">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                  Job Status
                </h2>
              </div>
            </div>
            <div className='sm:px-24 md:px-48 xl:px-24 2xl:px-48'>
              <DoughnutChart />
            </div>
          </section>
          <section className="p-6 rounded-md shadow-[0_0_10px_lightgray]">
            <div className="md:flex md:items-center md:justify-between border-b border-gray-200 pb-5 mb-5">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                  Job Status
                </h2>
              </div>
            </div>
            <BarChart />
          </section>
          <section className="p-6 rounded-md shadow-[0_0_10px_lightgray]">
            <div className="md:flex md:items-center md:justify-between border-b border-gray-200 pb-5 mb-5">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                  Job Status
                </h2>
              </div>
            </div>
            <HorizontalBarChart />
          </section>
          <section className="p-6 rounded-md shadow-[0_0_10px_lightgray]">
            <div className="md:flex md:items-center md:justify-between border-b border-gray-200 pb-5 mb-5">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                  Job Status
                </h2>
              </div>
            </div>
            <AreaChart />
          </section>
          <section className="p-6 rounded-md shadow-[0_0_10px_lightgray]">
            <div className="md:flex md:items-center md:justify-between border-b border-gray-200 pb-5 mb-5">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                  Job Status
                </h2>
              </div>
            </div>
            <PolarChart />
          </section>
          <section className="p-6 rounded-md shadow-[0_0_10px_lightgray]">
            <div className="md:flex md:items-center md:justify-between border-b border-gray-200 pb-5 mb-5">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                  Job Status
                </h2>
              </div>
            </div>
            <RadarChart />
          </section>
        </main>

        <aside className="sticky top-40 -mt-1 hidden w-96 shrink-0 xl:block">

          {/* Right column area */ }
          <section className="p-6">
            <div className="border-b border-gray-200 pb-5 mb-5">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Quick Actions
              </h3>
            </div>
            <Accordion
              items={ accordianItems }
            />
          </section>
        </aside>
      </div>
    </>
  )
}
export default AccountDashboardPage

'use client'

import HorizontalBarChart from '@components/atom/charts/HorizontalBarChart'
import AreaChart from '@components/atom/charts/AreaChart'


const DashboardOperationsPage = () =>
{
  return (
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
    </main>
  )
}
export default DashboardOperationsPage
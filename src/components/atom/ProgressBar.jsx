import { CheckIcon } from '@heroicons/react/20/solid'

const ProgressBar = ({ state }) =>
{
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">

        {
          state.progress.map((step, stepIdx) => (

            <li key={ stepIdx } className={ `${ stepIdx !== state.progress.length - 1 && stepIdx !== state.progress.length - 2
              ? state.progress.length < 6
                ? 'pr-8 sm:pr-20'
                : 'pr-8 sm:pr-12'
              : '' } relative` }>

              {
                step.status === 'complete' ?

                  <>
                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                      <div className="h-0.5 w-full bg-sky-600" />
                    </div>
                    <a
                      href="#"
                      className="relative flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 hover:bg-sky-900"
                    >
                      <CheckIcon aria-hidden="true" className="h-5 w-5 text-white" />
                      <span className="sr-only">{ step.name }</span>
                    </a>
                  </>

                  :

                  step.status === 'current' ?

                    <>
                      <div aria-hidden="true" className="absolute inset-0 flex items-center">
                        <div className="h-0.5 w-full bg-gray-200" />
                      </div>
                      <a
                        href="#"
                        aria-current="step"
                        className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-sky-600 bg-white"
                      >
                        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-sky-600" />
                        <span className="sr-only">{ step.name }</span>
                      </a>
                    </>

                    :

                    stepIdx === state.progress.length - 2 ?

                      <>
                        <a
                          href="#"
                          className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                        >
                          <span
                            aria-hidden="true"
                            className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                          />
                          <span className="sr-only">{ step.name }</span>
                        </a>
                      </>

                      :

                      step.name === 'New User Completed' ?

                        null

                        :

                        <>
                          <div aria-hidden="true" className="absolute inset-0 flex items-center">
                            <div className="h-0.5 w-full bg-gray-200" />
                          </div>
                          <a
                            href="#"
                            className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                          >
                            <span
                              aria-hidden="true"
                              className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                            />
                            <span className="sr-only">{ step.name }</span>
                          </a>
                        </>

              }

            </li>

          ))
        }

      </ol>
    </nav>
  )
}

export default ProgressBar
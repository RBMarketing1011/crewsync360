'use client'

import { useState, useRef, useEffect } from "react"

const Accordion = ({ items }) =>
{
  const [ openIndex, setOpenIndex ] = useState(0)
  const contentRefs = useRef([])

  const toggleAccordion = (index) =>
  {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() =>
  {
    // Set up the height for open items initially
    contentRefs.current.forEach((content, index) =>
    {
      if (content && openIndex === index)
      {
        content.style.height = `${ content.scrollHeight }px`
      } else if (content)
      {
        content.style.height = "0px"
      }
    })
  }, [ openIndex ])

  return (
    <div>

      {
        items.map((item, index) => (

          <div key={ index } className="py-1 my-1 border-b border-gray-200">
            <button
              type="button"
              className="w-full flex justify-between items-center focus:outline-none transition-all ease-in-out text-sky-700"
              onClick={ () => toggleAccordion(index) }
            >
              <span>{ item.title }</span>
              <svg
                className={ `w-5 h-5 transition-transform transform ${ openIndex === index ? "rotate-180" : "rotate-0"
                  }` }
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              ref={ (el) => (contentRefs.current[ index ] = el) }
              className={ `transition-all duration-300 ease-in-out overflow-hidden` }
              style={ {
                height: openIndex === index ? `${ contentRefs.current[ index ]?.scrollHeight }px` : "0px",
                opacity: openIndex === index ? 1 : 0,
                transition: "height 300ms ease-in-out, opacity 200ms ease-in-out",
              } }
            >
              <div className="p-4 bg-white">
                { item.content }
              </div>
            </div>
          </div>

        ))
      }

    </div>
  )
}

export default Accordion

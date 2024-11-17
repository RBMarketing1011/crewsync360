const NoData = ({ icon, title, desc, outline, align }) =>
{
  return (
    <button
      type="button"
      className={ `${ outline ? 'border-2 border-gray-300 border-dashed' : 'border-0' } w-full p-4 rounded-md bg-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600 text-${ align }` }
    >
      <span className={ `${ align === 'center'
        ? 'justify-center'
        :
        align === 'right' && 'justify-end' } w-full flex` }>
        { icon }
      </span>
      <span className="mt-2 block text-md font-semibold text-gray-900">
        { title }
      </span>
      <span className="mt-2 block text-xs font-semibold text-gray-400">
        { desc }
      </span>
    </button>
  )
}

export default NoData
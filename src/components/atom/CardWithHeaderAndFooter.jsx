const CardWithHeaderAndFooter = ({ header, footer, children }) =>
{
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        {/* Content goes here */ }
        {/* We use less vertical padding on card headers on desktop than on body sections */ }
        { header }
      </div>
      <div className="px-4 py-5 sm:p-6">
        {/* Content goes here */ }
        { children }
      </div>
      <div className="px-4 py-4 sm:px-6">
        {/* Content goes here */ }
        {/* We use less vertical padding on card footers at all sizes than on headers or body sections */ }
        { footer }
      </div>
    </div>
  )
}

export default CardWithHeaderAndFooter

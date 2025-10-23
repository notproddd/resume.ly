export default function TemplatePreview({ data }) {
  return (
    <div className="p-4 text-gray-900">
      <div className="text-xl font-bold">{data.contact.name}</div>
      <div className="text-sm text-gray-600">{data.contact.email} • {data.contact.phone}</div>
      <hr className="my-3" />
      <div className="mb-2"><strong>Summary</strong>
        <div className="text-sm text-gray-700">{data.summary}</div>
      </div>
    </div>
  )
}

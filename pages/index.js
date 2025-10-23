import { useState, useRef } from 'react'
// TemplatePreview and ExportPDFButton will be added next

const defaultData = {
  contact: { name: 'Jane Doe', email: 'jane@example.com', phone: '+1 555 1234' },
  summary: 'Product designer with 5+ years experience building delightful interfaces.',
}

export default function Editor() {
  const [data, setData] = useState(defaultData)
  const previewRef = useRef()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold">resume.ly — Editor</h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block">
              <div className="text-sm font-medium">Name</div>
              <input className="mt-1 block w-full border rounded p-2" value={data.contact.name} onChange={e => setData({...data, contact: {...data.contact, name: e.target.value}})} />
            </label>
            <label className="block mt-3">
              <div className="text-sm font-medium">Summary</div>
              <textarea className="mt-1 block w-full border rounded p-2" value={data.summary} onChange={e => setData({...data, summary: e.target.value})} />
            </label>
          </div>

          <div>
            <div className="bg-white border rounded p-4" ref={previewRef}>
              <div className="text-xl font-bold">{data.contact.name}</div>
              <div className="text-sm text-gray-600">{data.contact.email}</div>
              <hr className="my-3" />
              <div className="text-sm text-gray-700">{data.summary}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ModernTemplate({ data }) {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system' }}>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="text-2xl font-bold text-blue-700">{data.contact?.name}</div>
          <div className="text-sm text-gray-600">{data.contact?.title}</div>
        </div>
        <div className="w-40 text-sm text-right text-gray-600">
          <div>{data.contact?.email}</div>
          <div>{data.contact?.phone}</div>
        </div>
      </div>
      <div className="mt-3 bg-blue-50 p-3 rounded">
        <div className="text-sm text-gray-800">{data.summary}</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="font-semibold text-sm">Experience</div>
          <div className="mt-2 space-y-3 text-sm text-gray-700">
            {(data.experience||[]).map((e,i)=> (
              <div key={i}>
                <div className="font-semibold">{e.role}</div>
                <div className="text-xs text-gray-500">{e.company} • {e.from} — {e.to}</div>
                <div className="mt-1">{e.details}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold text-sm">Education</div>
          <div className="text-sm text-gray-700 mt-2">{(data.education||[]).map((ed,i)=> <div key={i}>{ed.degree} — {ed.school}</div>)}</div>

          <div className="mt-4 font-semibold text-sm">Skills</div>
          <div className="text-sm text-gray-700 mt-2">{(data.skills||[]).join(', ')}</div>
        </div>
      </div>
    </div>
  )
}

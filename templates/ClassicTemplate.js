export default function ClassicTemplate({ data }) {
  return (
    <div className="text-gray-900" style={{ fontFamily: 'Inter, system-ui, -apple-system' }}>
      <div className="flex justify-between items-start">
        <div>
          <div className="text-2xl font-bold">{data.contact?.name}</div>
          <div className="text-sm text-gray-600">{data.contact?.title}</div>
        </div>
        <div className="text-right text-sm text-gray-600">
          <div>{data.contact?.email}</div>
          <div>{data.contact?.phone}</div>
        </div>
      </div>
      <hr className="my-3 border-gray-200" />
      <div className="mb-3">
        <div className="font-semibold text-sm">Summary</div>
        <div className="text-sm text-gray-700">{data.summary}</div>
      </div>

      <div>
        <div className="font-semibold text-sm">Experience</div>
        <div className="mt-2 space-y-3">
          {(data.experience||[]).map((e, i) => (
            <div key={i}>
              <div className="font-semibold">{e.role} — {e.company}</div>
              <div className="text-xs text-gray-500">{e.from} — {e.to}</div>
              <div className="text-sm text-gray-700">{e.details}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="font-semibold text-sm">Education</div>
        <div className="text-sm text-gray-700">{(data.education||[]).map((ed,i)=> <div key={i}>{ed.degree}, {ed.school} — {ed.year}</div>)}</div>
      </div>

      <div className="mt-4">
        <div className="font-semibold text-sm">Skills</div>
        <div className="text-sm text-gray-700">{(data.skills||[]).join(', ')}</div>
      </div>
    </div>
  )
}

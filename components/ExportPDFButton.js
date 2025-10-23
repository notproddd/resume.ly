import { exportElementToPdf } from '../lib/exportPdf'

export default function ExportPDFButton({ targetRef, fileName = 'resume.pdf' }) {
  const handleExport = async () => {
    if (!targetRef.current) return
    await exportElementToPdf(targetRef.current, fileName)
  }

  return <button onClick={handleExport} className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded">Download PDF</button>
}

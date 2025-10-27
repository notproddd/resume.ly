// Dynamic imports to avoid SSR issues with browser-only libs
export async function exportElementToPdf(element, fileName = 'resume.pdf') {
  if (!element) throw new Error('No element provided')

  const { toPng } = await import('html-to-image')
  const { jsPDF } = await import('jspdf')

  const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 2 })
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
  const imgProps = pdf.getImageProperties(dataUrl)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
  pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save(fileName)
}

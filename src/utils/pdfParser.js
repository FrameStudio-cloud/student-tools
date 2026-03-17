import * as pdfjslib from "pdfjs-dist"

pdfjslib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

export async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjslib.getDocument({ data: arrayBuffer }).promise

  let fullText = ""

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()

    const pageText = content.items
      .map((item) => item.str)
      .join(" ")

    fullText += pageText + "\n"
  }

  return fullText
}
// Create Document Component

export const MyDocument = pdfSrc => (
  <iframe
    src={`${pdfSrc}#toolbar=0`}
    width='200%'
    height='800px'
    style={{ border: 'none' }}
  ></iframe>
)

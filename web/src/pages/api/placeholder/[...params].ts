import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { params } = req.query

  // Generate a simple placeholder image
  const width = params && params[0] ? parseInt(params[0] as string) : 32
  const height = params && params[1] ? parseInt(params[1] as string) : 32

  // Create a simple SVG placeholder
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#e0e0e0"/>
    <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="${Math.min(width, height) / 3}" fill="#888">
      ${width}x${height}
    </text>
  </svg>`.trim()

  res.setHeader('Content-Type', 'image/svg+xml')
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  res.status(200).send(svg)
}

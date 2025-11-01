import { createCanvas, ImageData } from '@napi-rs/canvas'
import { writeFileSync } from 'fs'

export default async function handler(req, res) {
  // 解析请求体获取文本
  let text = 'STEREO'
  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    text = body.text || text
  } else if (req.method === 'GET') {
    text = req.query?.text || text
  }
  var canvas = core(text)
  // 导出 PNG 为 dataURL
  const dataURL = canvas.toDataURL()
  res.setHeader('Content-Type', 'application/json')
  res.json({ dataURL })
}

function core(text = null) {
  const width = 100
  const height = 100

  // 模拟像素数据：每像素 4 通道 (RGBA)
  const data = new Uint8ClampedArray(width * height * 4)
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 // R
    data[i + 1] = 0 // G
    data[i + 2] = 0 // B
    data[i + 3] = 255 // A
  }

  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // 把像素数据放进 canvas
  const imgData = new ImageData(data, width, height)
  ctx.putImageData(imgData, 0, 0)
  return canvas
}

function main() {
  var canvas = core()
  writeFileSync('test.png', canvas.toBuffer('image/png'))
}
main()

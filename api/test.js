import { createCanvas, ImageData } from 'canvas'

export default async function handler(req, res) {
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

  // 导出 PNG
  // console.log(canvas.toDataURL())
  res.setHeader('Content-Type', 'image/png')
  canvas.createPNGStream().pipe(res)
}

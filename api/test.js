import { createCanvas, GlobalFonts } from '@napi-rs/canvas'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 尝试注册字体文件（如果存在）
// 支持多种常见字体路径
const fontPaths = [
  join(__dirname, '../fonts/DejaVuSans.ttf'),
  join(__dirname, '../fonts/Arial.ttf'),
  join(__dirname, '../fonts/NotoSans-Regular.ttf'),
  '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', // Linux
  '/System/Library/Fonts/Helvetica.ttc', // macOS
  'C:/Windows/Fonts/arial.ttf', // Windows
]

let fontRegistered = false
for (const fontPath of fontPaths) {
  try {
    GlobalFonts.registerFromPath(fontPath, 'SansSerif')
    fontRegistered = true
    console.log('✓ Font registered successfully from:', fontPath)
    break
  } catch (e) {
    // 继续尝试下一个路径
    // console.log('Font path not found:', fontPath)
  }
}

if (!fontRegistered) {
  console.error('⚠️ No font file found. Text rendering will not work properly in Vercel.')
  console.error('Font search paths attempted:', fontPaths)
}

export default async function handler(req, res) {
  const text = getRandomValidCode()
  const canvas_sirds = await getCanvasSirds(text)
  const dataURL = canvas_sirds.toDataURL()
  res.setHeader('Content-Type', 'application/json')
  res.json({ text, dataURL })
}

function getRandomValidCode() {
  const validChars = '23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ'
  const charLength = validChars.length
  let code = ''
  const validLength = 4
  for (let i = 0; i < validLength; i++) {
    let char = validChars.charAt(Math.floor(Math.random() * charLength))
    while (code.indexOf(char) !== -1) {
      char = validChars.charAt(Math.floor(Math.random() * charLength))
    }
    code += char
  }
  return code
}

function getRandom(x) {
  if (x <= 0) {
    return 0
  } else {
    return Math.floor(Math.random() * x)
  }
}

async function getCanvasSirds(text) {
  const WIDTH = 992
  const HEIGHT = 279
  const FONT = 180

  console.log(text)

  const canvas_grayscale = createCanvas(WIDTH, HEIGHT)
  const context_grayscale = canvas_grayscale.getContext('2d')
  context_grayscale.clearRect(0, 0, canvas_grayscale.width, canvas_grayscale.height)
  // 使用注册的字体，如果已注册则使用 'SansSerif'，否则使用 'sans-serif'
  const fontFamily = fontRegistered ? 'SansSerif' : 'sans-serif'
  context_grayscale.font = FONT + 'px ' + fontFamily
  console.log(context_grayscale.font)
  let text_width = context_grayscale.measureText(text).width
  console.log(text_width)

  // 如果 measureText 返回 0（通常在服务端环境中没有字体时会发生），
  // 使用基于字符数和字体大小的估算方法
  if (text_width === 0) {
    // 估算文本宽度：根据本地测试结果（300-400 for 4 chars at 180px），
    // 每个字符的平均宽度约为字体大小的 0.42-0.56 倍
    // 使用 0.5 作为中间值
    text_width = text.length * FONT * 0.5
    console.log('Using estimated text width:', text_width)
  }

  context_grayscale.fillText(text, (WIDTH - text_width) / 2, HEIGHT / 2 + FONT / 2)

  const canvas_sirds = createCanvas(WIDTH, HEIGHT)
  const context_sirds = canvas_sirds.getContext('2d')
  context_sirds.clearRect(0, 0, canvas_sirds.width, canvas_sirds.height)

  const stereo_cycles = 5
  const alpha = 3
  const pattern_width = Math.floor(WIDTH / stereo_cycles)

  var _g = 0
  var _g1 = WIDTH
  while (_g < _g1) {
    var i = _g++
    var _g2 = 0
    var _g3 = HEIGHT
    while (_g2 < _g3) {
      var j = _g2++
      var style = '#000000'
      if (getRandom(3) != 0) {
        style = '#FFFFFF'
      }
      context_sirds.fillStyle = style
      context_sirds.fillRect(i, j, 1, 1)
    }
  }

  const canvas_pattern = createCanvas(pattern_width, HEIGHT)
  const context_pattern = canvas_pattern.getContext('2d', null)
  const pattern = context_pattern.getImageData(0, 0, pattern_width, HEIGHT)
  const pixel_displace = Math.floor(pattern_width / 20)

  var _g = 0
  var _g1 = stereo_cycles
  while (_g < _g1) {
    var c = _g++
    const disparity = context_grayscale.getImageData(c * pattern_width + Math.floor(pattern_width / 2), 0, pattern_width, HEIGHT)
    const pattern_sirds = context_sirds.getImageData(c * pattern_width, 0, pattern_width, HEIGHT)
    var _g2 = 0
    var _g3 = 4 * disparity.data.length
    while (_g2 < _g3) {
      var i = _g2++
      pattern.data[i] = pattern_sirds.data[i]
    }
    var _g4 = 0
    var _g5 = disparity.data.length
    while (_g4 < _g5) {
      var i1 = _g4++
      pattern.data[i1 * 4 + alpha] = disparity.data[i1 * 4 + alpha] == 0 ? 255 : 0
    }
    context_pattern.putImageData(pattern, 0, 0)
    context_sirds.drawImage(canvas_pattern, (c + 1) * pattern_width - pixel_displace * 0, 0)
    var _g6 = 0
    var _g7 = disparity.data.length
    while (_g6 < _g7) {
      var i2 = _g6++
      pattern.data[i2 * 4 + alpha] = disparity.data[i2 * 4 + alpha] == 0 ? 0 : 255
    }
    context_pattern.putImageData(pattern, 0, 0)
    context_sirds.drawImage(canvas_pattern, (c + 1) * pattern_width - pixel_displace, 0)
  }

  return canvas_grayscale
}

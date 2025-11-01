const WIDTH = 992
const HEIGHT = 279
const FONT = 180

function myRandom(x) {
  if (x <= 0) {
    return 0
  } else {
    return Math.floor(Math.random() * x)
  }
}

function drawSirds() {
  const stereo_cycles = 5
  const alpha = 3
  const pattern_width = Math.floor(WIDTH / stereo_cycles)
  var canvas_grayscale = document.getElementById('grayscale')
  var canvas_sirds = document.getElementById('sirds')
  var context_grayscale = canvas_grayscale.getContext('2d', null)
  var context_sirds = canvas_sirds.getContext('2d', null)
  context_sirds.clearRect(0, 0, WIDTH, HEIGHT)
  var _g = 0
  var _g1 = WIDTH
  while (_g < _g1) {
    var i = _g++
    var _g2 = 0
    var _g3 = HEIGHT
    while (_g2 < _g3) {
      var j = _g2++
      var style = '#000000'
      if (myRandom(3) != 0) {
        style = '#FFFFFF'
      }
      context_sirds.fillStyle = style
      context_sirds.fillRect(i, j, 1, 1)
    }
  }
  var canvas_pattern = document.createElement('canvas')
  canvas_pattern.width = pattern_width
  canvas_pattern.height = HEIGHT
  var context_pattern = canvas_pattern.getContext('2d', null)
  var pattern = context_pattern.getImageData(0, 0, pattern_width, HEIGHT)
  var pixel_displace = Math.floor(pattern_width / 20)
  var _g = 0
  var _g1 = stereo_cycles
  while (_g < _g1) {
    var c = _g++
    var disparity = context_grayscale.getImageData(c * pattern_width + Math.floor(pattern_width / 2), 0, pattern_width, HEIGHT)
    var pattern_sirds = context_sirds.getImageData(c * pattern_width, 0, pattern_width, HEIGHT)
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
}

function drawGrayScale() {
  const text = document.getElementById('text').value
  const canvas_grayscale = document.getElementById('grayscale')
  const context_grayscale = canvas_grayscale.getContext('2d')
  context_grayscale.clearRect(0, 0, canvas_grayscale.width, canvas_grayscale.height)
  context_grayscale.font = FONT + 'px sans-serif'
  const text_width = context_grayscale.measureText(text).width
  context_grayscale.fillText(text, (WIDTH - text_width) / 2, HEIGHT / 2 + FONT / 2)

  const canvas_sirds = document.getElementById('sirds')
  const context_sirds = canvas_sirds.getContext('2d')
  context_sirds.clearRect(0, 0, canvas_sirds.width, canvas_sirds.height)
}

function main() {
  const params = new URLSearchParams(location.search)
  let text = params.get('text')
  if (!text || text === '') text = 'STEREO'
  document.getElementById('text').value = text

  const canvas_grayscale = document.getElementById('grayscale')
  const canvas_sirds = document.getElementById('sirds')
  canvas_grayscale.width = WIDTH
  canvas_grayscale.height = HEIGHT
  canvas_sirds.width = WIDTH
  canvas_sirds.height = HEIGHT

  drawGrayScale()
  drawSirds()
}

main()

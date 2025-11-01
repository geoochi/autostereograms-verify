function onload() {
  var params = new URLSearchParams(window.location.search)
  var text = params.get('text')
  if (!text || text === '') text = 'STEREO'
  document.getElementById('text').value = text

  var grayscale = document.getElementById('grayscale')
  var sirds = document.getElementById('sirds')
  grayscale.width = width
  grayscale.height = height
  sirds.width = width
  sirds.height = height

  draw()
  coreSirds()
}

function draw() {
  var grayscale = document.getElementById('grayscale')
  var text = document.getElementById('text').value
  var context = grayscale.getContext('2d')
  context.clearRect(0, 0, grayscale.width, grayscale.height)
  context.font = font + 'px sans-serif'
  var text_width = context.measureText(text).width
  context.fillText(text, (width - text_width) / 2, height / 2 + font / 2)

  var sirds = document.getElementById('sirds')
  var context_sirds = sirds.getContext('2d')
  context_sirds.clearRect(0, 0, sirds.width, sirds.height)
}

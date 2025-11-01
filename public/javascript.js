function onload() {
  var search = window.location.search
  if (search != null && search.substr(0, 6) == '?text=') {
    var text = search.substr(6)
    document.getElementById('text').value = text.replace(/\+/g, ' ')
  }

  var grayscale = document.getElementById('grayscale')
  var sirds = document.getElementById('sirds')
  grayscale.width = width
  grayscale.height = height
  sirds.width = width
  sirds.height = height

  draw()
  coreSirds()
}

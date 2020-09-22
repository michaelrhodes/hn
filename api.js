var origin = 'https://api.hnpwa.com/v0'
var cache = {}

module.exports = {
  news: (n, cb) => get('news', n, cb),
  item: (i, cb) => get('item', i, cb)
}

function get (type, id, cb) {
  if (cache[type + id]) return setTimeout(cb, 0, null, cache[type + id])

  var req = new XMLHttpRequest
  req.open('GET', `${origin}/${type}/${id}.json`)
  req.onload = () => cb(null, cache[type + id] = parse(req.responseText))
  req.onerror = cb
  req.send()
}

function parse (string, object) {
  try { object = JSON.parse(string) }
  catch (o_0) { object = null }
  return object
}

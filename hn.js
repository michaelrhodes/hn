var origin = 'https://api.hnpwa.com/v0'
var internal = /^item\?id=([0-9]+)$/
var cache = {}

module.exports = {
  news: function (n, cb) {
    get('news', n, function (err, news) {
      err ? cb(err) : cb(null, news.map(function (item) {
        item.domain = item.domain || null
        item.content = item.content || null
        item.url = internal.test(item.url) ?
          `#/item/${item.url.match(internal)[1]}` :
          item.url
        return item
      }))
    })
  },
  item: function (i, cb) {
    get('item', i, cb)
  }
}

function get (type, id, cb) {
  if (cache[type + id]) {
    return setTimeout(cb, 0, null, cache[type + id])
  }

  var req = new XMLHttpRequest
  req.open('GET', `${origin}/${type}/${id}.json`, true)
  req.onload = () => cb(null, cache[type + id] = parse(req.responseText))
  req.onerror = cb
  req.send()
}

function parse (text, json) {
  try { json = JSON.parse(text) }
  catch (err) { json = null }
  return json
}

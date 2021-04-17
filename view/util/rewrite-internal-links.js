module.exports = rewrite

var mkdom = require('mkdom/core')
var item = /^https?:\/\/news\.ycombinator\.com\/item\?id=([0-9]+)$/
var each = Array.prototype.forEach

function rewrite (html) {
  var node = mkdom(html)
  if (!node.querySelectorAll) return node
  var anchors = node.querySelectorAll('a')
  each.call(anchors, a => a.href = a.href.replace(item, '#/item/$1'))
  return node
}

var mkdom = require('mkdom/core')
var bind = require('view/bind')
var define = require('view/define')
var convert = require('./util/convert-time-to-date')
var rewrite = require('./util/rewrite-internal-url')

var template = mkdom(`
  <li>
    <a rel="noopener noreferrer"><h2></h2></a>
    <a class="comments"></a> by <embed class="user"> <time></time>
  </li>
`)

module.exports = define(template, {
  id: bind.attr('.comments', 'href', v => `#/item/${v}`),
  title: bind.text('h2'),
  url: bind.many(rewrite, [
    bind.attr('a', 'target', v => v[0] !== '#' && '_blank'),
    bind.attr('a', 'href')
  ]),
  user: bind.slot('.user'),
  time_ago: bind.text('time'),
  time: bind.many(convert, [
    bind.attr('time', 'datetime', v => v.toISOString()),
    bind.attr('time', 'title', v => v.toLocaleString())
  ]),
  comments_count: bind.text('.comments', v => `${v} comment${v === 1 ? '' : 's'}`)
})

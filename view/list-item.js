var mkdom = require('mkdom/core')
var bind = require('view/bind')
var define = require('view/define')
var convert = require('./util/convert-time-to-date')
var rewrite = require('./util/rewrite-internal-url')

var template = mkdom(`
  <li>
    <h2><a rel="noopener noreferrer"></a></h2>
    <a></a> by <embed class="user"> <time></time>
  </li>
`)

module.exports = define(template, {
  id: bind.attr('li > a', 'href', v => `#/item/${v}`),
  title: bind.html('h2 > a'),
  url: bind.many(rewrite, [
    bind.attr('h2 > a', 'target', v => v[0] !== '#' && '_blank'),
    bind.attr('h2 > a', 'href')
  ]),
  user: bind.slot('.user'),
  time_ago: bind.text('time'),
  time: bind.many(convert, [
    bind.attr('time', 'datetime', v => v.toISOString()),
    bind.attr('time', 'title', v => v.toLocaleString())
  ]),
  comments_count: bind.text('li > a', v => `${v} comment${v === 1 ? '' : 's'}`)
})

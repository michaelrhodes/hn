var mkdom = require('mkdom')
var bind = require('view/bind')
var define = require('view/define')
var convert = require('./util/convert-time-to-date')
var comments = v => v.length ? v.map(module.exports) : null

var template = mkdom(`
  <li class="comment">
    <p class="meta"><embed class="user"> <time></time></p>
    <embed class="content">
    <input class="replies-toggle" type="checkbox">
    <ul class="replies comments"></ul>
  </li>
`)

module.exports = define(template, {
  user: bind.slot('.user'),
  content: bind.slot('.content', mkdom),
  time_ago: bind.text('.meta time'),
  time: bind.many(convert, [
    bind.attr('.meta time', 'datetime', v => v.toISOString()),
    bind.attr('.meta time', 'title', v => v.toLocaleString())
  ]),
  comments_count: bind.many(v => v || null, [
    bind.attr('.replies-toggle', 'checked', v => false),
    bind.attr('.replies-toggle', 'data-count'),
    bind.visibility('.replies-toggle')
  ]),
  comments: bind.children('.replies', comments)
})

var mkdom = require('mkdom/core')
var define = require('view/define')
var bind = require('view/bind')
var convert = require('./util/convert-time-to-date')
var rewrite = require('./util/rewrite-internal-url')
var comment = require('./item-comment')
var comments = v => v.length ? v.map(comment) : null

var item = mkdom(`
  <article class="item">
    <a rel="noopener noreferrer" target="_blank">
      <h1></h1>
      <embed class="domain">
    </a>
    <embed class="content">
    <p class="meta">submitted by <embed class="user"> <time></time></p>
    <ul class="comments"></ul>
  </article>
`)

module.exports = define(item, {
  title: bind.html('h1'),
  url: bind.attr('a', 'href', rewrite),
  content: bind.slot('.content', mkdom),
  domain: bind.slot('.domain'),
  user: bind.slot('.user'),
  time_ago: bind.text('.meta time'),
  time: bind.many(convert, [
    bind.attr('.meta time', 'datetime', v => v.toISOString()),
    bind.attr('.meta time', 'title', v => v.toLocaleString())
  ]),
  comments: bind.children('.comments', comments)
})(item)

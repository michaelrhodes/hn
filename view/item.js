var mkdom = require('mkdom/core')
var define = require('view/define')
var bind = require('view/bind')
var convert = require('./util/convert-time-to-date')
var rewrite = require('./util/rewrite-internal-url')
var comment = require('./item-comment')
var comments = v => v.length ? v.map(comment) : null

var item = mkdom(`
  <article class="item">
    <h1><a rel="noopener noreferrer" target="_blank"></a></h1>
    <a rel="noopener noreferrer" target="_blank"></a>
    <embed class="content">
    <p class="meta">submitted by <embed class="user"> <time></time></p>
    <ul class="comments"></ul>
  </article>
`)

module.exports = define(item, {
  url: bind.many(rewrite, [
    bind.attr('h1 > a', 'href'),
    bind.attr('article > a', 'href')
  ]),
  title: bind.html('h1 > a'),
  domain: bind.text('article > a'),
  content: bind.slot('.content', mkdom),
  user: bind.slot('.user'),
  time_ago: bind.text('.meta time'),
  time: bind.many(convert, [
    bind.attr('.meta time', 'datetime', v => v.toISOString()),
    bind.attr('.meta time', 'title', v => v.toLocaleString())
  ]),
  comments: bind.children('.comments', comments)
})(item)

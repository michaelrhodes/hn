var mkdom = require('mkdom')
var define = require('view/define')
var refine = require('view/refine')
var bind = require('view/bind')
var comment = require('./item-comment')
var rewrite = require('./util/rewrite-internal-url')
var convert = require('./util/convert-time-to-date')

var template = mkdom(`
  <article class="item">
    <a rel="noopener noreferrer" target="_blank">
      <h1></h1>
      <span class="domain"></span>
    </a>
    <p class="content"></p>
    <p class="meta">
      submitted by 
      <span class="user"></span> 
      <time></time>
    </p>
    <ul class="comments"></ul>
  </article>
`)

var item = define(template, {
  url: bind.attr('a', 'href'),
  title: bind.text('h1'),
  content: bind.html('.content'),
  domain: bind.text('.domain'),
  user: bind.text('.user'),
  time_ago: bind.text('.meta time'),
  time: bind.many([
    bind.attr('.meta time', 'datetime', v => v.toISOString()),
    bind.attr('.meta time', 'title', v => v.toLocaleString())
  ]),
  comments: bind.children('.comments')
})

refine(item, {
  url: rewrite,
  time: convert,
  comments: v => v.map(comment)
})

module.exports = item()

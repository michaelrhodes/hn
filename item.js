var mkdom = require('mkdom')
var define = require('view/define')
var bind = require('view/bind')
var comment = require('./item-comment.js')

var template = mkdom(`
  <article class="item">
    <a rel="noopener noreferrer" target="_blank">
      <h1></h1>
      <span class="domain"></span>
    </a>
    <p class="content"></p>
    <p class="meta">submitted by <span class="user"></span> <time></time></p>
    <ul class="comments"></ul>
  </article>
`)

module.exports = define(template, {
  url: bind.attr('a', 'href'),
  title: bind.text('h1'),
  content: bind.html('.content'),
  domain: bind.text('.domain'),
  user: bind.text('.user'),
  time_ago: bind.text('.meta time'),
  time: bind.combine([
    bind.attr('.meta time', 'datetime', time => new Date(time * 1000).toISOString()),
    bind.attr('.meta time', 'title', time => new Date(time * 1000).toLocaleString())
  ]),
  comments: bind.subviews('.comments', comment, list => list.length ? list : null)
})()

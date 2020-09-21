var mkdom = require('mkdom')
var define = require('view/define')
var refine = require('view/refine')
var bind = require('view/bind')
var comment = require('./item-comment.js')
var internal = /^item\?id=([0-9]+)$/

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
  time: bind.combine([
    bind.attr('.meta time', 'datetime', v => v.toISOString()),
    bind.attr('.meta time', 'title', v => v.toLocaleString())
  ]),
  comments: bind.children('.comments')
})

refine(item, {
  url: v => internal.test(v) ? `#/item/${v.match(internal)[1]}` : v,
  time: v => new Date(v * 1000),
  comments: v => v.map(comment)
})

module.exports = item()

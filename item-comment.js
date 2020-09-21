var mkdom = require('mkdom')
var define = require('view/define')
var refine = require('view/refine')
var bind = require('view/bind')

var template = mkdom(`
  <li class="comment">
    <p class="meta">
      <span class="user"></span>
      <time></time>
    </p>
    <div class="content"></div>
    <input class="replies-toggle" type="checkbox">
    <ul class="replies comments"></ul>
  </li>
`)

var comment = define(template, {
  content: bind.html('.content'),
  user: bind.text('.user'),
  time_ago: bind.text('.meta time'),
  time: bind.combine([
    bind.attr('.meta time', 'datetime', v => v.toISOString()),
    bind.attr('.meta time', 'title', v => v.toLocaleString())
  ]),
  comments_count: bind.combine([
    bind.attr('.replies-toggle', 'data-count'), function () {
      this.get('.replies-toggle').checked = false
    }
  ]),
  comments: bind.children('.replies')
})

refine(comment, {
  time: v => new Date(v * 1000),
  comments: v => v.map(comment)
})

module.exports = comment

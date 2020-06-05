var mkdom = require('mkdom')
var transform = require('view/transform')
var define = require('view/define')
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
    bind.attr('.meta time', 'datetime', time => new Date(time * 1000).toISOString()),
    bind.attr('.meta time', 'title', time => new Date(time * 1000).toLocaleString())
  ]),
  comments: bind.children('.replies'),
  comments_count: bind.combine([
    bind.attr('.replies-toggle', 'data-count'),
    hide_replies
  ])
})

transform(comment, {
  comments: cs => cs.length ? cs.map(c => comment(c)) : null
})

module.exports = comment

function hide_replies () {
  this.get('.replies-toggle').checked = false
}

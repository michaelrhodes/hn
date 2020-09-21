var mkdom = require('mkdom')
var define = require('view/define')
var refine = require('view/refine')
var bind = require('view/bind')

var template = mkdom(`
  <li>
    <h2 class="title">
      <a rel="noopener noreferrer"></a>
    </h2>
    <a class="comments"></a>
    by <span class="user"></span>
    <time></time>
  </li>
`)

module.exports = define(template, {
  id: bind.attr('.comments', 'href', v => `#/item/${v}`),
  title: bind.text('h2 a'),
  url: bind.combine([
    bind.attr('h2 a', 'target', v => v[0] !== '#' && '_blank'),
    bind.attr('h2 a', 'href')
  ]),
  user: bind.text('.user'),
  time_ago: bind.text('time'),
  time: bind.combine([
    bind.attr('time', 'datetime', v => v.toISOString()),
    bind.attr('time', 'title', v => v.toLocaleString())
  ]),
  comments_count: bind.text('.comments', v => `${v} comment${v === 1 ? '' : 's'}`)
})

refine(module.exports, {
  time: v => new Date(v * 1000)
})

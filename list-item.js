var mkdom = require('mkdom')
var define = require('view/define')
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

var item = define(template, {
  id: bind.attr('.comments', 'href', id => `#/item/${id}`),
  title: bind.text('h2 a'),
  url: bind.combine([
    bind.attr('h2 a', 'href'),
    bind.attr('h2 a', 'target', url => url[0] !== '#' && '_blank')
  ]),
  user: bind.text('.user'),
  time_ago: bind.text('time'),
  time: bind.combine([
    bind.attr('time', 'datetime', time => new Date(time * 1000).toISOString()),
    bind.attr('time', 'title', time => new Date(time * 1000).toLocaleString())
  ]),
  comments_count: bind.text('.comments', count => `${count} comment${count === 1 ? '' : 's'}`)
})

module.exports = item

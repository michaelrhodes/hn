var mkdom = require('mkdom')
var define = require('view/define')
var bind = require('view/bind')
var item = require('./list-item')

var template = mkdom(`
  <section>
    <h1></h1>
    <ol class="items"></ol>
    <a class="next"></a>
  </section>
`)

module.exports = define(template, {
  page: bind.combine([
    bind.text('h1', num => num > 1 ? null : 'Hacker News'),
    bind.attr('.items', 'style', num => `counter-reset: item ${(num - 1) * 30}`),
    bind.text('a', num => `Page ${num + 1}`),
    bind.attr('a', 'href', num => `#/page/${num + 1}`)
  ]),
  items: bind.subviews('.items', item)
})()

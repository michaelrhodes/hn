var mkdom = require('mkdom')
var define = require('view/define')
var refine = require('view/refine')
var bind = require('view/bind')
var pool = require('view/pool')
var item = require('./list-item')
var items = pool(item, 30)

var template = mkdom(`
  <section>
    <h1></h1>
    <ol class="items"></ol>
    <a class="next"></a>
  </section>
`)

var list = define(template, {
  page: bind.combine([
    bind.text('h1', v => v > 1 ? null : 'Hacker News'),
    bind.attr('.items', 'style', v => `counter-reset: item ${(v - 1) * 30}`),
    bind.text('a', v => `Page ${v + 1}`),
    bind.attr('a', 'href', v => `#/page/${v + 1}`)
  ]),
  items: bind.children('.items')
})

refine(list, {
  items: v => items(v)
})

module.exports = list()

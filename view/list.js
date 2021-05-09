var mkdom = require('mkdom/core')
var bind = require('view/bind')
var pool = require('view/pool')
var define = require('view/define')
var item = require('./list-item')
var items = pool(item, 30)

var list = mkdom(`
  <section>
    <h1><a href="#">Hacker News</a></h1>
    <ol class="items"></ol>
    <a class="next"></a>
  </section>
`)

module.exports = define({
  page: bind.many([
    bind.attr('.items', 'start', v => (v - 1) * 30),
    bind.text('.next', v => `Page ${v + 1}`),
    bind.attr('.next', 'href', v => `#/page/${v + 1}`)
  ]),
  items: bind.children('.items', items)
})(list)

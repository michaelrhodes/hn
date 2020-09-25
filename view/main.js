var mkdom = require('mkdom')
var bind = require('view/bind')
var define = require('view/define')

var main = mkdom('<main>')

module.exports = define(main, {
  loading: bind.attr('data-is-loading'),
  view: bind.children()
})()

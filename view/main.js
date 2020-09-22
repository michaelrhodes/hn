var mkdom = require('mkdom')
var define = require('view/define')
var bind = require('view/bind')

var main = mkdom('<main>')

module.exports = define(main, {
  loading: bind.attr('data-is-loading'),
  view: bind.children()
})()
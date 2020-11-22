var mkdom = require('mkdom/core')
var bind = require('view/bind')
var define = require('view/define/core')

var main = mkdom('<main>')

module.exports = define({
  loading: bind.attr('data-is-loading'),
  view: bind.children()
})(main)

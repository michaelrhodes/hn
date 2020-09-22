var main = require('./view/main')
var list = require('./view/list')
var item = require('./view/item')
var hn = require('./api')
var y = 0

;(onscroll = track)()
;(onhashchange = navigate)()
history.scrollRestoration = 'manual'
document.body.appendChild(main.el)

function track () {
  if (main.view === list) y = pageYOffset
}

function navigate () {
  var segment = location.hash.substr(2).split('/')
  var type = segment[0] || 'page'
  var id = segment[1] || 1

  main.loading = true

  if (type === 'page') {
    var paging = main.view === list

    hn.news(id, function (err, items) {
      if (err) return alert(err)
      list.page = Number(id)
      list.items = items
      main.view = list
      main.loading = false
      scrollTo(0, paging ? 0 : y)
    })
  }
  else if (type === 'item') {
    hn.item(id, function (err, details) {
      if (err) return alert(err)
      main.view = item.set(details)
      main.loading = false
      scrollTo(0, 0)
    })
  }
  else {
    main.view = null
    main.loading = false
  }
}

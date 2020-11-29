var hn = require('./api')
var item = require('./view/item')
var list = require('./view/list')
var main = require('./view/main')
var y = 0

!(onscroll = track)()
!(onhashchange = navigate)()
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
    hn.news(id, function (err, items) {
      if (err) return alert(err)

      // Are we navigating between pages?
      var paging = main.view === list

      list.page = +id
      list.items = items
      main.view = list
      main.loading = false

      title(list.page > 1 && ('Page ' + list.page))

      // Restore scroll position when
      // navigating back from item
      scrollTo(0, paging ? 0 : y)
    })
  }
  else if (type === 'item') {
    hn.item(id, function (err, details) {
      if (err) return alert(err)
      main.view = item.set(details)
      main.loading = false
      title(details.title)
      scrollTo(0, 0)
    })
  }
  else {
    main.view = null
    main.loading = false
    title(null)
  }
}

function title (t) {
  document.title = (t ? (t + ' | ') : '') + 'Hacker News'
}

var fs = require('fs')
var child = require('child_process')
var mkdom = require('mkdom')
var bind = require('view/bind')
var define = require('view/define')

var html = fs.readFileSync('index.html', 'utf8')
var tmpl = mkdom(html)
var page = define(tmpl, {
  script: bind.many([
    bind.attr('script', 'src', v => null),
    bind.text('script')
  ])
})(tmpl)

var s
var script = ''
var bundle = './node_modules/.bin/bundle'
var bundler = child.spawn(bundle, ['index'], {
  cwd: process.cwd(),
  env: process.env,
  stdio: ['ipc']
})

bundler.stdout.on('readable', function () {
  while ((s = bundler.stdout.read()) !== null) script += s
})

bundler.stdout.on('end', function () {
  page.script = script

  fs.writeFileSync('hn.html', page.toString()
    .replace(/\\n\s*/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/>\s+</g, '> <'))
})

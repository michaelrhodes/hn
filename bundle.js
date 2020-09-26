var fs = require('fs')
var child = require('child_process')
var mkdom = require('mkdom')
var bind = require('view/bind')
var define = require('view/define')

var html = fs.readFileSync('index.html', 'utf8')
var tmpl = mkdom(html)
var page = define(tmpl, {
  bundle: bind.many([
    bind.attr('script', 'src', v => null),
    bind.text('script')
  ])
}, {})

var b
var bundle = ''
var bundler = './node_modules/.bin/bundle'
var task = child.spawn(bundler, ['index'], {
  cwd: process.cwd(),
  env: process.env,
  stdio: ['ipc']
})

task.stdout.on('readable', function () {
  while ((b = task.stdout.read()) !== null) bundle += b
})

task.stdout.on('end', function () {
  page.bundle = bundle

  fs.writeFileSync('bundle.html', page.toString()
    .replace(/\\n\s*/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/>\s+</g, '> <'))
})

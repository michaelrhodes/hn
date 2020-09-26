var internal = /^item\?id=([0-9]+)$/
module.exports = url => internal.test(url) ? `#/item/${url.match(internal)[1]}` : url

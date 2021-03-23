var item = /^item\?id=([0-9]+)$/
module.exports = url => url.replace(item, (m, id) => `#/item/${id}`)

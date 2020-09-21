module.exports = pool

function pool (view, size) {
  var pool = [], i = 0
  while (i < size) pool[i++] = view()
  return v => pool[i = Math.min(++i, size) % size].set(v)
}

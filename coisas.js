window.coisas.filterTreeFiles = f => {
  if (f.path[0] === '.') return false

  switch (f.path.split('.').slice(-1)[0]) {
    case 'js':
    case 'xidel':
    case 'fish':
    case 'json':
    case 'yml':
    case 'CNAME':
    case 'realpath':
      return false
    default:
      return true
  }
}

window.load(
  'https://cdn.rawgit.com/fiatjaf/haikunator-porreta/fb5db13f/dist/haikunator-porreta.min.js'
, err => {
  if (err) return
  window.coisas.defaultNewFile = (dirPath) => {
    let haiku = window.haikunate()
    return Promise.resolve({
      name: `${haiku}.md`,
      content: '~ write something here.',
      metadata: {
        title: haiku.split('-').map(w => w.replace(/\w/, ch => ch.toUpperCase())).join(' '),
        date: (new Date()).toISOString().split('T')[0]
      }
    })
  }
})

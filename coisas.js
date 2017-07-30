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

// react-site exports a lot of pre-required modules, including the `require()`
// functions, so this will work.
window.load('https://rawgit.com/fiatjaf/levypla/gh-pages/bundle.js')
  .then(() => {
    window.module = {exports: null}
    return window.load('https://rawgit.com/fiatjaf/levypla/master/body.js')
  })
  .then(() => {
    window.Body = window.module.exports
  })

window.coisas.canPreview = (_, ext) => ext === 'html' || ext === 'md'
window.coisas.generatePreview = (el, {
  path,
  name,
  ext,
  mime,
  content,
  metadata,
  slug,
  tree,
  edited
}) => {
  el.style.padding = '20px'
  let sh = el.attachShadow({mode: 'open'})

  let h = require('react-hyperscript')
  let render = require('react-dom').render

  var Component = require('wrap.js')({
    filename: name,
    pathname: path,
    title: metadata.title,
    summary: metadata.summary,
    date: metadata.date
  }, content)

  render(h(Component), sh)
}

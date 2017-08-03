window.coisas.filterTreeFiles = f => {
  if (f.path[0] === '.') return false

  switch (f.path.split('.').slice(-1)[0]) {
    case 'js':
    case 'xidel':
    case 'fish':
    case 'json':
    case 'yml':
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
window.load('https://levypla.surge.sh/bundle.js')
  .then(() => {
    window.module = {exports: null}
    return window.load('https://rawgit.com/fiatjaf/levypla/master/body.js')
  })
  .then(() => {
    window.Body = window.module.exports
  })

window.coisas.canPreview = (_, ext) => ext === '.html' || ext === '.md'
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

  let style = document.createElement('style')
  style.innerHTML = '@import url("https://levypla.surge.sh/style.css")'
  sh.appendChild(style)

  let root = document.createElement('div')
  sh.appendChild(root)

  let pathname = path.split('/').slice(-1)[0].split('.')[0] === 'index'
    ? '/' + path.split('/').slice(0, -1).join('/') + '/'
    : '/' + path.split('.').slice(0, -1).join('/') + '/'

  let amd = require('micro-amd')()
  let React = require('react')
  let render = require('react-dom').render

  window.define = amd.define.bind(amd)
  window.define.amd = true
  window.reactSite.rootElement = root

  let surl = window.reactSite.utils.standaloneURL(pathname)
  amd.require([surl], function (page) {
    var props = page.props

    props.location = {
      pathname: pathname,
      search: ''
    }
    props.meta.ext = ext
    props.meta.pathname = pathname
    props.meta.filename = name
    props.meta.title = metadata.title
    props.meta.summary = metadata.summary
    props.meta.date = metadata.date
    props.content = content

    render(React.createElement(window.reactSite.Main, {
      component: page.component,
      props: props
    }), window.reactSite.rootElement)
  })
}

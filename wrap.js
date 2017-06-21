const h = require('react-hyperscript')
const MarkdownIt = require('markdown-it')
const matter = require('gray-matter')

module.exports = function wrapperFactory (meta, content) {
  var ext = meta.filename.split('.').slice(-1)[0]

  return function Wrapper () {
    var child
    var title

    switch (ext) {
      case 'txt':
        title = meta.title || meta.filename.split('/').slice(-1)[0].split('.')[0]
        child = h('pre', [
          h('code', {
            dangerouslySetInnerHTML: {__html: content}
          })
        ])
        break
      case 'md':
        var md = new MarkdownIt()
        var body = matter(content).content
        title = meta.title || meta.filename.split('/').slice(-1)[0].split('.')[0]
        child = h('div', {
          dangerouslySetInnerHTML: {__html: md.render(body)}
        })
        break
      case 'html':
        return h('article', {
          dangerouslySetInnerHTML: {__html: content}
        })
      case 'js':
        title = meta.title
        child = h(content, this.props)
        break
    }

    return h('article', [
      h('h1', title),
      child
    ])
  }
}

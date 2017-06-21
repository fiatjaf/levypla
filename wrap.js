const h = require('react-hyperscript')
const date = require('data-bonita')
const MarkdownIt = require('markdown-it')
const matter = require('gray-matter')

module.exports = function wrapperFactory (meta, content) {
  var ext = meta.filename.split('.').slice(-1)[0]

  return function Wrapper (props) {
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

        return h('article', [
          h('h1', title),
          h('.post', {
            dangerouslySetInnerHTML: {__html: md.render(body)}
          }),
          h('p', [
            meta.date
              ? h('b', date.abs(new Date(Date.parse(meta.date))))
              : null
          ])
        ])
      case 'html':
        return h('article', {
          dangerouslySetInnerHTML: {__html: content}
        })
      case 'js':
        title = meta.title
        child = h(content, props)
        break
      default:
        return null
    }

    return h('article', [
      h('h1', title),
      child
    ])
  }
}

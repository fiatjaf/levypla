const h = require('react-hyperscript')
const date = require('data-bonita')
const MarkdownIt = require('markdown-it')
const matter = require('gray-matter')

function getDate (meta) {
  return meta.datetime || meta.created || meta.modified ||
         meta.gitCreated || meta.gitModified || meta.fsCreated || meta.fsModified
}

module.exports = function wrapperFactory (meta, content) {
  var ext = meta.filename.split('.').slice(-1)[0]

  return function Wrapper (props) {
    switch (ext) {
      case 'txt':
        return h('article', [
          h('h1', meta.title),
          h('pre', [
            h('code', {
              dangerouslySetInnerHTML: {__html: content}
            })
          ]),
          h('p', [
            meta.pathname.slice(0, 8) === '/blogue/'
              ? h('b', date.abs(new Date(getDate(meta))))
              : null
          ])
        ])
      case 'md':
        var md = new MarkdownIt()
        var body = matter(content).content

        return h('article', [
          h('h1', meta.title),
          h('.post', {
            dangerouslySetInnerHTML: {__html: md.render(body)}
          }),
          h('p', [
            meta.pathname.slice(0, 8) === '/blogue/'
              ? h('b', date.abs(new Date(getDate(meta))))
              : null
          ])
        ])
      case 'html':
        return h('article', [
          h('.post', {
            dangerouslySetInnerHTML: {__html: content}
          }),
          h('p', [
            meta.pathname.slice(0, 8) === '/blogue/'
              ? h('b', date.abs(new Date(getDate(meta))))
              : null
          ])
        ])
      case 'js':
        return h('article', [
          h('h1', meta.title),
          h(content, props)
        ])
    }
  }
}

const h = require('react-hyperscript')
const date = require('data-bonita')
const MarkdownIt = require('markdown-it')
const matter = require('gray-matter')

function getDate (meta) {
  return meta.date
    ? meta.date.match(/\d{4}-\d{2}-\d{2}/)
      ? meta.date
      : meta.date.split('/').reverse().map(ch => ch.length >= 2 ? ch : '0' + ch).join('-')
    : meta.created || meta.modified ||
      meta.gitCreated || meta.gitModified || meta.fsCreated || meta.fsModified
}

module.exports = function wrapperFactory (meta, content) {
  var ext = meta.filename.split('.').slice(-1)[0]

  return function Wrapper (props) {
    switch (ext) {
      case 'txt':
        return h('article', [
          h('h1', meta.title),
          meta.image ? h('img', {src: meta.image}) : null,
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
          meta.image ? h('img', {src: meta.image}) : null,
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
      default:
        return h('div', 'invalid file')
    }
  }
}

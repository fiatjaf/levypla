const h = require('react-hyperscript')
const date = require('data-bonita')
const MarkdownIt = require('markdown-it')

function getDate (meta) {
  return meta.date
    ? meta.date.match(/\d{4}-\d{2}-\d{2}/)
      ? meta.date
      : meta.date.split('/').reverse().map(ch => ch.length >= 2 ? ch : '0' + ch).join('-')
    : meta.created || meta.modified ||
      meta.gitCreated || meta.gitModified || meta.fsCreated || meta.fsModified
}

module.exports = function ({meta, content}) {
  var md = new MarkdownIt()

  return h('article', [
    h('h1', meta.title),
    meta.image ? h('img', {src: meta.image}) : null,
    h('.post', {
      dangerouslySetInnerHTML: {__html: md.render(content)}
    }),
    h('p', [
      meta.pathname.slice(0, 8) === '/blogue/'
        ? h('b', date.abs(new Date(getDate(meta))))
        : null
    ])
  ])
}

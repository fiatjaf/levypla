const h = require('react-hyperscript')
const date = require('data-bonita')

function getDate (meta) {
  return meta.datetime || meta.created || meta.modified ||
         meta.gitCreated || meta.gitModified || meta.fsCreated || meta.fsModified
}

module.exports = function BlogIndex (props) {
  let pages = props.pages
  let blogposts = Object.keys(pages)
    .filter(pathname => pathname.slice(0, props.meta.pathname.length) === props.meta.pathname)
    .filter(pathname => pathname !== props.meta.pathname)
    .filter(pathname => pages[pathname].title && getDate(pages[pathname]))

  return (
    h('ul.posts', blogposts
      .map(pathname => pages[pathname])
      .sort((a, b) => getDate(a) < getDate(b) ? 1 : -1)
      .map(page =>
        h('li', [
          h('h2', [
            h('a', {href: page.pathname}, page.title)
          ]),
          page.summary ? h('article.summary', [
            page.summary,
            ' ',
            h('a', {href: page.pathname}, '(...)')
          ]) : null,
          h('p', [
            h('a', {href: page.pathname},
              date.abs(new Date(getDate(page)))
            )
          ])
        ])
      )
    )
  )
}

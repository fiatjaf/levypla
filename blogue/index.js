const h = require('react-hyperscript')
const date = require('data-bonita')

module.exports = function BlogIndex (props) {
  let pages = props.pages
  let blogposts = Object.keys(pages)
    .filter(pathname => pathname.slice(0, props.meta.pathname.length) === props.meta.pathname)
    .filter(pathname => pathname !== props.meta.pathname)
    .filter(pathname => pages[pathname].title && pages[pathname].date)

  return (
    h('ul.posts', blogposts
      .map(pathname => pages[pathname])
      .sort((a, b) => a.date < b.date ? 1 : -1)
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
            h('a', {href: page.pathname}, date.abs(new Date(Date.parse(page.date))))
          ])
        ])
      )
    )
  )
}

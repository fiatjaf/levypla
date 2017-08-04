const h = require('react-hyperscript')
const date = require('data-bonita')

const {getDate} = require('../utils')

module.exports = function BlogIndex ({pages}) {
  let blogposts = pages
    .filter(p => getDate(p))

  return (
    h('ul.posts', blogposts
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

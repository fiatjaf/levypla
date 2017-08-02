const h = require('react-hyperscript')

module.exports = function (props) {
  let {meta, content} = props

  return h('article', [
    h('h1', meta.title),
    h(content, props)
  ])
}

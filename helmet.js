const Helmet = require('react-helmet')
const h = require('react-hyperscript')

const sitename = 'Eduardo Levy'

module.exports = function makeHelmet (props) {
  var title = props.meta.title
    ? props.meta.title + ' | ' + sitename
    : sitename + ', traduções, tatuagens e dança aeróbica'

  return h(Helmet, {
    meta: [
      {charset: 'utf-8'},
      {httpEquiv: 'x-ua-compatible', content: 'ie: edge'},
      {name: 'description', content: 'A pior forma de solidão é a companhia de Eduardo Levy.'},
      {name: 'viewport', content: 'width: device-width, initial-scale: 1.0'}
    ],
    title: title,
    link: [
      {rel: 'stylesheet', href: '/style.css'}
    ]
  })
}

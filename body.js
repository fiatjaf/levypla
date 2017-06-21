const h = require('react-hyperscript')

module.exports = function Body (props) {
  return h('div', [
    h('header', [
      h('h1', [
        h('a', {href: '/'}, 'levypla')
      ])
    ]),
    h('nav', [
      h('ul', [
        h('li', [h('a', {href: '/sobre-mim/'}, 'Sobre mim')]),
        h('li', [h('a', {href: '/cursos/'}, 'Cursos')]),
        h('li', [h('a', {href: '/servicos-linguisticos/'}, 'Serviços lingüísticos')]),
        h('li', [h('a', {href: '/livros-traduzidos/'}, 'Livros traduzidos')]),
        h('li', [h('a', {href: '/blogue/'}, 'Blogue')]),
        h('li', [h('a', {href: '/contato/'}, 'Contato')])
      ])
    ]),
    h('main', props.children),
    h('footer', [
      h('p', '~')
    ]),
    h('script', {src: '/bundle.js'})
  ])
}

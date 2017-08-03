const h = require('react-hyperscript')

module.exports = function Body (props) {
  return h('main', [
    h('nav.nav', [
      h('.nav-left', [
        h('a.nav-item', {href: '/'}, 'Eduardo Levy')
      ]),
      h('.nav-center', [
        h('a.nav-item', {href: '/sobre-mim/'}, 'Sobre mim'),
        h('a.nav-item', {href: '/cursos/'}, 'Cursos'),
        h('a.nav-item', {href: '/servicos-linguisticos/'}, 'Serviços lingüísticos'),
        h('a.nav-item', {href: '/livros-traduzidos/'}, 'Livros traduzidos'),
        h('a.nav-item', {href: '/blogue/'}, 'Blogue'),
        h('a.nav-item', {href: '/contato/'}, 'Contato')
      ])
    ]),
    h('main.section', [
      h('.columns', [
        h('.column.is-10.is-offset-1', props.children)
      ])
    ]),
    h('footer.footer', [
      h('p', '~')
    ]),
    h('script', {src: '/bundle.js'})
  ])
}

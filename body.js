const h = require('react-hyperscript')

module.exports = function Body (props) {
  return h('#levypla', {
    ref: el => {
      if (el) {
        let burger = el.querySelector('.navbar-burger')
        let menu = el.querySelector('.navbar-menu')
        burger.onclick = function () {
          burger.classList.toggle('is-active')
          menu.classList.toggle('is-active')
        }
      }
    }
  }, [
    h('nav.navbar', [
      h('.navbar-brand', [
        h('a.navbar-item', {href: '/'}, [
          h('img', {src: '/icon-semfundo.png', alt: 'Eduardo Levy'})
        ]),
        h('.navbar-burger', [
          h('span'),
          h('span'),
          h('span')
        ])
      ]),
      h('.navbar-menu', [
        h('.navbar-end', [
          h('a.navbar-item', {href: '/sobre-mim/'}, 'Sobre mim'),
          h('a.navbar-item', {href: '/cursos/'}, 'Cursos'),
          h('a.navbar-item', {href: '/servicos-linguisticos/'}, 'Serviços lingüísticos'),
          h('a.navbar-item', {href: '/livros-traduzidos/'}, 'Livros traduzidos'),
          h('a.navbar-item', {href: '/blogue/'}, 'Blogue'),
          h('a.navbar-item', {href: '/contato/'}, 'Contato')
        ])
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

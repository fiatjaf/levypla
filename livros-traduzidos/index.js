const h = require('react-hyperscript')

module.exports = function Livros ({pages}) {
  return (
    h('table.livros-traduzidos', [
      h('tbody', pages.map(p =>
        h('tr', [
          h('th.face', [
            h('h2', p.nome),
            h('img', {src: p.capa})
          ]),
          h('td.desc', [
            h('dl', Object.keys(p)
              .filter(key => key !== 'nome' && key !== 'capa' && key !== 'text')
              .map(key =>
                h('div', {key: key}, [
                  h('dt', key),
                  h('dd', p[key])
                ])
              )
            ),
            h('hr'),
            h('p', p.text)
          ])
        ])
      ))
    ])
  )
}


const matter = require('gray-matter')
const extractSummary = require('extract-summary')

const {init, end, listFiles, generatePage, copyStatic} = require('react-site')

init()

let filestobuild = listFiles({
  ignore: [
    'admin/*',
    'media/*',
    'wrap-*.js',
    'utils.js',
    '_*/**'
  ]
})

for (let i = 0; i < filestobuild.length; i++) {
  let data = filestobuild[i]

  let {pathname, gitCreated, gitModified, fsCreated, fsModified} = data
  var meta = {pathname, gitCreated, gitModified, fsCreated, fsModified}
  var content = data.content

  if (data.ext === '.md' || data.ext === '.html') {
    let {data: frontmatter, content: text} = matter(data.content)
    meta = Object.assign(meta, frontmatter)
    content = text
  } else if (data.ext === '.js') {
    if (data.pathname === '/blogue/') {
      generatePage(data.pathname, data.filepath, {
        meta,
        content,
        pages: filestobuild
          .filter(f => f.pathname.match(/\/blogue\/.+/))
          .map(f => {
            let {data: frontmatter, content: text} = matter(f.content)
            return Object.assign({
              pathname: f.pathname,
              gitCreated: f.gitCreated,
              gitModified: f.gitModified,
              fsCreated: f.fsCreated,
              fsModified: f.fsModified,
              summary: extractSummary(text)
            }, frontmatter)
          })
      })
      continue
    }

    if (data.pathname === '/livros-traduzidos/') {

    }

    meta = Object.assign(meta, content.meta)
  }

  generatePage(data.pathname, `wrap-${data.ext.slice(1)}.js`, {meta, content})
}

copyStatic([
  '*.css',
  'body.js',
  'media/*',
  'admin/*',
  'coisas.js',
  '_config.yml'
])

end()

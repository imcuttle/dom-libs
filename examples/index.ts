const batchReq = require.context('!!null-loader!.', false, /\.html?/)

document.getElementById('root').innerHTML = `
<ul>
    ${batchReq
      .keys()
      .map((name) => {
        const basename = name.replace(/\.[^.]+$/, '').replace(/^\.\//, '')
        if ('index' === basename) {
          return ''
        }

        return `<li><a href="${name}">${basename}</a></li>`
      })
      .join('\n')}
</ul>
`

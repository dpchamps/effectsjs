const sleep = ms => new Promise(res => setTimeout(res, ms || 200))
async function awaitDependencies () {
  const waitingFor = {
    Babel: false,
    ace: false
  }
  while (true) {
    Object.keys(waitingFor).forEach(key => {
      if (window[key]) {
        waitingFor[key] = window[key]
      }
    })
    const stillWaitingFor = Object.keys(waitingFor).filter(key => waitingFor[key] === false)
    if (!stillWaitingFor.length) {
      return waitingFor
    }
    await sleep()
    console.info(`[dependency-awaiter]: still pending ${stillWaitingFor.join(', ')}`)
  }
}

var __unpatched_console__ = null

function maybeMonkeyPatchConsole (el) {
  if (console === __unpatched_console__) return
  __unpatched_console__ = window.console
  unpatchedLog = window.console.log
  unpatchedInfo = window.console.info
  unpatchedWarn = window.console.warn
  unpatchedError = window.console.error
  const withTap = (fn, fn2) => {
    return (...args) => {
      fn(...args)
      return fn2(...args)
    }
  }
  const appendLog = (...args) => {
    var node = document.createElement("div")
    node.innerHTML = [
      `<pre>`,
      `<span class='console-date-string'>${new Date().toISOString()}: <span>`,
      args.map(arg => JSON.stringify(arg)),
      `</pre>`
    ].join('')
    el.appendChild(node)
  }
  window.console.log = withTap(appendLog, unpatchedLog)
  window.console.info = withTap(appendLog, unpatchedInfo)
  window.console.warn = withTap(appendLog, unpatchedWarn)
  window.console.error = withTap(appendLog, unpatchedError)
}
async function init () {
  const dependencies = await awaitDependencies()
  const { Babel, ace } = dependencies
  var editor = ace.edit("editor", {
    useWorker: false
  })
  editor.setTheme("ace/theme/monokai")
  editor.session.setMode("ace/mode/javascript")
  window.editor = editor
  window.editorRunOutput = window.document.getElementById('editorRunOutput')
  maybeMonkeyPatchConsole(window.editorRunOutput)
  let text = ''
  const evaluate = () => {
    text = editor.getValue()
    try {
      const transformed = babelified = Babel.transform(text, {
        plugins: [
          window.transformEffects
        ]
      }).code
      eval(transformed)
    } catch (err) {
      console.error(err)
    }
  }
  editor.on('change', evaluate)
  evaluate()
}
init()
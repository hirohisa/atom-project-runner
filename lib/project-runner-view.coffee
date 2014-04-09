{View} = require 'atom'
AnsiFilter = require 'ansi-to-html'

module.exports =
class ProjectRunnerView extends View

  @content: ->
    @div class: 'project-runner native-key-bindings tool-panel panel-bottom', outlet: 'runner', tabindex: -1, =>
      @pre class: 'stacktrace', outlet: 'output'

  initialize: ->

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  refresh: ->
    @output.empty()

  show: (state, stacktrace='')->
    if not @hasParent()
      atom.workspaceView.prependToBottom(this)

    @refresh()

    # stacktrace
    pre = document.createElement('pre')
    node = document.createTextNode(stacktrace)
    pre.appendChild(node)

    pre.innerHTML = new AnsiFilter().toHtml(pre.innerHTML)
    @output.append(pre)

    # result
    status     = if state == true then '✓ succeeded' else '× failed'
    className  = if state == true then 'stdout' else 'stderr'

    result = document.createElement('span')
    result.className = className
    node = document.createTextNode(status)
    result.appendChild(node)

    pre.appendChild(result)

  close: ->
    if @hasParent()
      @detach()

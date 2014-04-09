{View} = require 'atom'
AnsiFilter = require 'ansi-to-html'

module.exports =
class ProjectRunnerView extends View

  @content: ->
    @div class: 'project-runner native-key-bindings tool-panel panel-bottom', outlet: 'runner', tabindex: -1, =>
      @pre class: 'stacktrace', outlet: 'output'

  initialize: ->
    @AnsiFilter = new AnsiFilter

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  refresh: ->
    @output.empty()

  show: (state, stacktrace='')->
    if not @hasParent()
      atom.workspaceView.prependToBottom(this)
    @refresh()

    line = @AnsiFilter.toHtml(stacktrace)

    @output.append("<pre class='stacktrace'>#{line}</pre>")

  close: ->
    if @hasParent()
      @detach()

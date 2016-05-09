ProjectRunnerView = require './project-runner-view'
shell = require 'shelljs'

class ProjectRunnerBuildr

  constructor: ->
    shell.cd atom.project.getPaths()[0]
    atom.config.setDefaults('project-runner', environmentVariables:'')

  command:(state) ->
    for file in shell.ls '*file'#|config.*
      if file is 'Makefile'
        return @make(state)
      if file is 'Rakefile'
        return @rake(state)

  make:(state) ->
    if state is 'run'
      return 'make run'
    return 'make test'

  rake:(state) ->
    if state is 'run'
      return 'rake run'
    return 'rake test --trace'

class ProjectRunner

  constructor: ->
    @runnerView = new ProjectRunnerView()
    @projectRunnerBuildr = new ProjectRunnerBuildr

  activate: ->
    atom.commands.add 'atom-workspace', 'project-runner:run',
      => @run( @projectRunnerBuildr.command('run') )
    atom.commands.add 'atom-workspace', 'project-runner:test',
      => @run( @projectRunnerBuildr.command('test') )

  deactivate: ->
    @runnerView.destroy()

  run: (script) ->
    if @runnerView.hasParent()
      @close()
      return

    if script is undefined
      @runnerView.show(false, 'no such file: Makefile or Rakefile\n')
      return

    environmentVariables = JSON.parse('{"env":['+atom.config.get("project-runner.environmentVariables")+"]}")
    for variable in environmentVariables.env
      variableSplit = variable.split('=')
      name = variableSplit[0]
      value = variableSplit[1]
      shell.env[name] = value

    @execute(script)

  close: ->
    @runnerView.close()

  execute: (cmd) ->
    shell.cd atom.project.path
    shell.exec cmd, (code, output) =>
      @runnerView.show(code is 0, output)
      @runnerView.scrollToBottom()

module.exports = new ProjectRunner

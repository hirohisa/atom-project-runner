ProjectRunnerView = require './project-runner-view'
shell = require 'shelljs'

fs = require('fs')

class ProjectRunnerBuildr

  constructor: ->
    shell.cd atom.project.path

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
    atom.workspaceView.command 'project-runner:run',
      => @run( @projectRunnerBuildr.command('run') )
    atom.workspaceView.command 'project-runner:test',
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

    @execute(script)

  close: ->
    @runnerView.close()

  execute: (cmd) ->
    shell.cd atom.project.path
    shell.exec cmd, (code, output) =>
      @runnerView.show(code is 0, output)
      @runnerView.scrollToBottom()

module.exports = new ProjectRunner

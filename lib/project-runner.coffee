ProjectRunnerView = require './project-runner-view'
shell = require 'shelljs'

fs = require('fs')

class ProjectRunner
  runnerView: null

  activate: ->
    @runnerView = new ProjectRunnerView()
    try
      config_path = atom.project.path + '/Makefile'
      file = fs.readFileSync(config_path, 'UTF8')
    catch e
      @runnerView.show(false, 'no such file: ' + config_path)
      console.log('no such file: ' + config_path);
      return

    atom.workspaceView.command 'project-runner:run', => @run('make run')
    atom.workspaceView.command 'project-runner:test', => @run('make test')

  deactivate: ->
    @runnerView.destroy()

  run: (script) ->
    if @runnerView.hasParent()
      @close()
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

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
      @runnerView.show('no such file: ' + config_path)
      console.log('no such file: ' + config_path);
      return

    atom.workspaceView.command 'project-runner:run', => @run('make run')
    atom.workspaceView.command 'project-runner:test', => @run('make test')
    atom.workspaceView.command 'project-runner:close', => @close()

  deactivate: ->
    @runnerView.destroy()

  run: (script) ->
    @execute(script)

  close: ->
    @runnerView.close();

  execute: (cmd) ->
    shell.cd atom.project.path
    shell.exec cmd, (code, output) =>
      if code is 0
        @runnerView.show('succeeded', output)
        @runnerView.scrollToBottom()
      else
        @runnerView.show('build success:', code)
        @runnerView.scrollToBottom()

module.exports = new ProjectRunner

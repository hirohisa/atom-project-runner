AtomScriptView = require '../lib/project-runner-view'
{WorkspaceView} = require 'atom'

describe "ProjectRunnerView", ->
  it "has one valid test", ->
    expect("life").toBe "easy"

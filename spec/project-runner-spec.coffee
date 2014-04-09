ProjectRunner = require '../lib/project-runner'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "ProjectRunner", ->
  activationPromise = null

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    activationPromise = atom.packages.activatePackage('projectRunner')

  describe "when the project-runner:run event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('.project-runner')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.workspaceView.trigger 'project-runner:run'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.workspaceView.find('.project-runner')).toExist()
        atom.workspaceView.trigger 'project-runner:run'
        expect(atom.workspaceView.find('.project-runner')).not.toExist()

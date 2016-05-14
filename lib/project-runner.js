'use babel';

import ProjectRunnerView from './project-runner-view';
import ProjectRunnerScripter from './project-runner-scripter';
import { CompositeDisposable } from 'atom';

export default {

  activate(state) {
    this.runnerView = new ProjectRunnerView(state.runnerViewState);
    this.scripter = new ProjectRunnerScripter();
    this.scripter.outputView = this.runnerView;
    this.mainPanel = atom.workspace.addBottomPanel({
      item: this.runnerView.element,
      visible: false
    });

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'project-runner:run': () => this.run()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'project-runner:test': () => this.test()
    }));
  },

  deactivate() {
    this.mainPanel.destroy();
    this.subscriptions.dispose();
    this.runnerView.destroy();
  },

  serialize() {
    return {
      runnerViewState: this.runnerView.serialize()
    };
  },

  toggleMainPanel() {
    this.mainPanel.isVisible() ?
    this.mainPanel.hide() :
    this.mainPanel.show()
  },

  run() {
    this.toggleMainPanel();
    this.executeOnPanelVisible('run');
  },

  test() {
    this.toggleMainPanel();
    this.executeOnPanelVisible('test');
  },

  executeOnPanelVisible(state) {
    if (!this.mainPanel.isVisible()) {
      this.scripter.cancel();
      return;
    }

    this.scripter.execute(state);
  },
};

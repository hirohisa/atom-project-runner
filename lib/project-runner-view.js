'use babel';

import { View, $ } from 'atom-space-pen-views';

export default class ProjectRunnerView extends View {

  static content() {
    this.div({ tabIndex: -1, class: 'project-runner native-key-bindings tool-panel panel-bottom' }, () => {
      // this.div({ class: 'stacktrace', outlet: 'output' });
      this.pre({ class: 'stacktrace', outlet: 'output' });
    });
  }

  constructor(serializedState) {
    super(serializedState);
    $(this.element).css('height', '200px');
  }

  setup() {
    this.clear();
  }

  getStacktraceNode() {
    return $('.project-runner .stacktrace');
  }

  print(string) {
    span = $('<span>', {
      text: string
    });
    this.write(span);
  }

  finish(succeeded) {
    style = (succeeded) ? 'color: #49FF3C' : 'color: red';
    string = (succeeded) ? '✓ succeeded' : '× failed';
    span = $('<span>', {
      style: style,
      text: string
    });
    this.write(span);
  }

  write(element) {
    const stacktrace = this.getStacktraceNode();
    stacktrace.append(element);
    stacktrace.css('height', '200px');
    stacktrace.scrollToBottom();
  }

  clear() {
    const stacktrace = this.getStacktraceNode();
    stacktrace.empty();
  }

  serialize() {}

  destroy() {}
}

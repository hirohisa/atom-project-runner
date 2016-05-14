'use babel';

import { Rake, Make } from './project-runner-command';

export default class ProjectRunnerScripter {

  constructor(cwd) {
    if (cwd == undefined) {
      cwd = atom.project.getPaths()[0];
    }
    this.cwd = cwd;
  }

  setup() {
    this.outputView.setup();
    this.cancel();
    try {
      process.chdir(this.cwd);
    } catch(e) {
      this.outputView.finish(e);
    }
  }

  execute(state) {
    this.setup();
    const delegate = this;
    this.ensure(state, cmd => {
      delegate.runCommand(cmd);
    })
  }

  runCommand(cmd) {
    if (cmd === undefined) return;

    const spawn = require('child_process').spawn;
    const script = spawn(cmd.exec, cmd.args);
    const outputView = this.outputView;
    script.stdout.setEncoding('utf8');
    script.stdout.on('data', function(data) {
      if (outputView == undefined) return;
      outputView.print(data);
    });
    script.stderr.setEncoding('utf8');
    script.stderr.on('data', (data) => {
      if (outputView == undefined) return;
      outputView.print(data);
    });
    script.on('close', (code, signal) => {
      if (outputView == undefined) return;
      outputView.finish((code === 0));
    });

    this.process = script;
  }

  cancel() {
    if (this.process) {
      this.process.kill('SIGINT');
      this.process = null;
    }
  }

  // callback(Object)
  ensure(state, callback) {
    rake = new Rake(state), make = new Make(state);

    Promise.all(this.findCommand([rake, make], this.cwd)).then(function (results) {
      cmd = results.filter(item => item != undefined)[0]
      callback(cmd);
    });
  }

  findCommand = function(cmds, cwd) {
    const functions =  cmds.map( cmd =>
      new Promise(function (resolve, reject) {
        const exec = require('child_process').exec;
        const ls = 'ls ' + cwd +  ' | grep -i ' + cmd.filename;
        const child = exec(ls,
          (error, stdout, stderr) => {
            result = undefined;
            if (stdout.length > 0 && error === null) {
              result = cmd;
            }
            resolve(result);
        });
      })
    )

    return functions
  }


  serialize() {}

  destroy() {
  }
}

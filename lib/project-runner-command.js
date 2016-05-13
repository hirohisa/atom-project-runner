'use babel';

class Rake {

  constructor(state) {
    this.filename = 'rakefile';
    this.exec = 'rake';
    this.args = (state == 'test') ? ['test', '--trace'] : [];
  }

}

class Make {

  constructor(state) {
    this.filename = 'makefile';
    this.exec = 'make';
    this.args = (state == 'test') ? ['test'] : [];
  }

}


export { Rake, Make };

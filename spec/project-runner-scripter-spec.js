'use babel';

import ProjectRunnerScripter from '../lib/project-runner-scripter';
import ProjectRunnerView from '../lib/project-runner-view';
import { Rake } from '../lib/project-runner-command';

describe('ProjectRunnerScripter', () => {
  describe('when scripter initialize', () => {

    workspace = () => {
      return __dirname.substring(0, __dirname.lastIndexOf('/')); // project runner's directory
    }

    it('sets default path to project directory', () => {
      scripter = new ProjectRunnerScripter(workspace());
      expect(scripter.cwd).toBeDefined();
    });

    it('sets argument `path`', () => {
      path = '/tmp';
      scripter = new ProjectRunnerScripter(path);
      expect(scripter.cwd).toBe(path);
    });

    it('finds Raikefile and ensures command with `run`', () => {
      scripter = new ProjectRunnerScripter(workspace());
      scripter.ensure('run', function(cmd) {
        expect(cmd.exec).toEqual('rake');
        expect(cmd.args).toEqual([]);
      });
    });

    it('finds Raikefile and ensures command with `test`', () => {
      scripter = new ProjectRunnerScripter(workspace());
      scripter.ensure('test', function(cmd) {
        expect(cmd.exec).toEqual('rake');
        expect(cmd.args).toEqual(['test', '--trace']);
      });
    });

    it('doesnt find Makefile or Rakefile in other path', () => {
      scripter = new ProjectRunnerScripter('/tmp');
      scripter.ensure('test', function(cmd) {
        expect(cmd).toBe(undefined);
      });
    });

    it('finds Rakefile in project root path', () => {
      scripter = new ProjectRunnerScripter(workspace());
      scripter.outputView = new ProjectRunnerView();
      expect(scripter.outputView).toBeDefined();
    });

    it('sets outputView', () => {
      scripter = new ProjectRunnerScripter(workspace());
      scripter.outputView = new ProjectRunnerView();
      expect(scripter.outputView).toBeDefined();
    });

    it('runs with rake then process exists', () => {
      scripter = new ProjectRunnerScripter(workspace());
      rake = new Rake('run');
      scripter.runCommand(rake);
      scripter.outputView = new ProjectRunnerView();
      expect(scripter.process).toBeDefined();

      scripter.cancel();
      expect(scripter.process).toBeNull();
    });

    it('test', () => {
      // scripter = new ProjectRunnerScripter();
      // expect(process.getgid()).toBe('');
      // fs.readdirSync(scripter.cwd)
      // expect(process.cwd()).toBe('');
      // expect(process.getgid()).toBe('');
      // expect(__dirname).toBe('');
    });
  });
});

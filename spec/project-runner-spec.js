'use babel';

import ProjectRunner from '../lib/project-runner';

describe('ProjectRunner', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('project-runner');
  });

  describe('when the project-runner:run event is triggered', () => {
    it('hides and shows the modal panel', () => {
      atom.commands.dispatch(workspaceElement, 'project-runner:run');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.project-runner')).toExist();

        let packageElement = workspaceElement.querySelector('.project-runner');
        expect(packageElement).toExist();

        let packagePanel = atom.workspace.panelForItem(packageElement);
        expect(packagePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'project-runner:run');
        expect(packagePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      jasmine.attachToDOM(workspaceElement);

      atom.commands.dispatch(workspaceElement, 'project-runner:run');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        let packageElement = workspaceElement.querySelector('.project-runner');
        expect(packageElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'project-runner:run');
        expect(packageElement).not.toBeVisible();
      });
    });
  });
});

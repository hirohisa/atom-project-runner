atom-project-runner
==================

Run with project's makefile in Atom.


Commands
-------

- `⌘-r` to make run
- `⌘-u` to make test
- `ctrl-c` to close output's window

Installation
-------

```
apm install project-runner
```


Setup
-------


Make configuration file `Makefile`.
Set the file to directory on project's root path.

#### ⌘-r
```yml
run:
  ruby example/test_run.rb
```

#### ⌘-u
```yml
test:
  ruby example/test_test.rb
```

TODO
--------

- update view for script's result

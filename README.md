atom-project-runner
==================

Run project's code in Atom.


Commands
-------

- `⌘-r`
 - Make run, if shows result then hide.

- `⌘-u`
 - Make test and control to toggle

- `ctrl-c`
 - Close output's window

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

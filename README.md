atom-project-runner
==================

Run project's code in Atom.

Commands
-------

- `⌘-r`
 - Make run, if shows result then hide.

- `⌘-u`
 - Make test, if shows result then hide.


![screenshot success](https://raw.github.com/hirohisa/atom-project-runner/master/example/screenshot_success.png "Screenshot")
![screenshot fail](https://raw.github.com/hirohisa/atom-project-runner/master/example/screenshot_fail.png "Screenshot")


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

- make run then auto save
- support other files, Rakefile...

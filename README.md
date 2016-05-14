atom-project-runner
==================

Run project's code in Atom.

[![Package version](https://img.shields.io/apm/v/project-runner.svg)](https://atom.io/packages/project-runner)
[![Build Status](https://travis-ci.org/hirohisa/atom-project-runner.svg?branch=master)](https://travis-ci.org/hirohisa/atom-project-runner)

Commands
-------

- to run with configuration file for building, if shows result then hide.
 - `⌘-r` OSX
 - `ctrl-r` win32, Linux

- to test with configuration file for building , if shows result then hide.
 - `⌘-u` OSX
 - `ctrl-u` win32, Linux

![screenshot success](https://raw.github.com/hirohisa/atom-project-runner/master/example/screenshot_success.png "Screenshot")
![screenshot fail](https://raw.github.com/hirohisa/atom-project-runner/master/example/screenshot_fail.png "Screenshot")


Installation
-------

```
apm install project-runner
```

Setup
-------

Make configuration file `Makefile` or `Rakefile`.
Set the file to directory on project's root path.

### Makefile
```yml

all:
  ruby example/test_run.rb
test:
  ruby example/test_test.rb

```

### Rakefile
```ruby

task :default do
  ruby "example/test_run.rb"
end

task :test do
  ruby "example/test_test.rb"
end

```

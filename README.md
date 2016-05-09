atom-project-runner
==================

Run project's code in Atom.

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

TODO
--------

- make run then auto save
- support other files for building

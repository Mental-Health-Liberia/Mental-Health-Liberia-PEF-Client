class aptupdate {
    exec { "aptGetUpdate":
        command => "sudo apt-get update",
        path => ["/bin", "/usr/bin"]
    }
}

class node-js {
  include apt
  apt::ppa {
    'ppa:chris-lea/node.js': notify => Package["nodejs"]
  }

  package { "nodejs" :
      ensure => latest,
      require => [Exec["aptGetUpdate"],Class["apt"]]
  }

  exec { "npm-update" :
      cwd => "/vagrant",
      command => "npm -g update",
      onlyif => ["test -d /vag rant/node_modules"],
      path => ["/bin", "/usr/bin"],
      require => Package['nodejs']
  }
}

class mongodb {
  exec { "10genKeys":
    command => "sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10",
    path => ["/bin", "/usr/bin"],
    notify => Exec["aptGetUpdate"],
    unless => "apt-key list | grep 10gen"
  }

  file { "10gen.list":
    path => "/etc/apt/sources.list.d/10gen.list",
    ensure => file,
    content => "deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen",
    notify => Exec["10genKeys"]
  }

  package { "mongodb-10gen":
    ensure => present,
    require => [Exec["aptGetUpdate"],File["10gen.list"]]
  }
}

class pef-dependencies {
  exec { 'install grunt':
    command => '/usr/bin/npm install -g grunt grunt-cli',
    require => Exec['npm-update'],
  }

  exec { 'install bower':
    command => '/usr/bin/npm install -g bower',
    require => Exec['npm-update']
  }

  exec { 'install nodemon':
    command => '/usr/bin/npm install -g nodemon',
    require => Exec['npm-update']
  }

  exec { 'install bundle':
    command => '/opt/vagrant_ruby/bin/gem install bundler',
  }

  exec { 'install node dependencies':
    command => '/usr/bin/npm installl',
    cwd => '/vagrant',
    require => Exec['npm-update']
  }

  exec { 'install bower dependencies':
    command => '/usr/bin/bower --allow-root install',
    cwd => '/vagrant',
    require => [ Exec['install bower'] ],
  }

  exec { 'install required gems':
    command => '/opt/vagrant_ruby/bin/bundle',
    cwd => '/vagrant',
    require => Exec['install bundle'],
  }

  exec { 'build site':
    command => '/usr/bin/grunt build',
    cwd => '/vagrant',
    require => Exec['install grunt'],
  }
}

include aptupdate
include node-js
include mongodb
include pef-dependencies
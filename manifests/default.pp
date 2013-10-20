class do-stuff {
  include apt

  exec { 'update':
    command => '/usr/bin/apt-get update'
  }

  package { [ 'build-essential', 'git', 'python', 'g++', 'make', 'checkinstall' ]:
    ensure  => present,
    require => Exec['update'],
  }

  exec { 'get node':
    command => '/usr/bin/wget -N http://nodejs.org/dist/node-latest.tar.gz',
    cwd => '/tmp',
  }

  file { '/tmp/node-latest':
    ensure => 'directory'
  }

  exec { 'decompress node':
    command => '/bin/tar xzvf node-latest.tar.gz --strip-components 1 -C /tmp/node-latest',
    cwd => '/tmp',
    require => [ Exec['get node'], File['/tmp/node-latest'] ]
  }

  exec { 'configure node':
    command => '/usr/bin/python configure',
    cwd => '/tmp/node-latest',
    require => [ Exec['decompress node'], Package['python'] ],
  }

  exec { 'make':
    command => '/usr/bin/make && /usr/bin/make install',
    cwd => '/tmp/node-latest',
    require => [ Exec['configure node'], Package['make'], Package['build-essential'], Package['g++'] ],
  }

  exec { 'install grunt and bower':
    command => '/usr/local/bin/npm install -g grunt-cli bower',
    require => Exec['make'],
  }

  exec { 'install nodemon':
    command => '/usr/local/bin/npm install -g nodemon',
    require => Exec['make']
  }

  exec { 'install bundle':
    command => '/opt/vagrant_ruby/bin/gem install bundler',
  }

  exec { 'install dependencies':
    command => '/usr/local/bin/npm install; /usr/local/bin/bower --allow-root install',
    cwd => '/vagrant',
    require => [ Exec['make'], Exec['install grunt and bower'] ],
  }

  exec { 'install required gems':
    command => '/opt/vagrant_ruby/bin/bundle',
    cwd => '/vagrant',
    require => Exec['install bundle'],
  }

  exec { 'build site':
    command => '/usr/local/bin/grunt build',
    cwd => '/vagrant',
    require => Exec['install dependencies'],
  }
}

include do-stuff
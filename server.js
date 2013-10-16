var express = require('express');
var app = express();
var port = 9000;

/*
 * Set app settings depending on environment mode.
 * Express automatically sets the environment to 'development'
 */
if (process.env.NODE_ENV === 'production' || process.argv[2] === 'production') {
  console.log('Setting production env variable');
  app.set('env', 'production');

  app.locals.dev = false;
} else {
  app.locals.dev = true;
}


/*
 * Config
 */
if (/^development|test$/.test(app.get('env'))) {
  app.use(express.logger('dev'));

  app.set('views', __dirname + '/views');
} else if (app.get('env') === 'production') {
  app.set('views', __dirname + '/dist/views');
}

app.use(express.bodyParser());
app.use(express.compress());
app.use(express.methodOverride());

// host dev files if in dev mode
if (/^development|test$/.test(app.get('env'))) {
  app.use(express.static('.tmp'));
  app.use(express.static('app'));
} else if (app.get('env') === 'production') {
  app.use(express.static('dist/app'));
}

app.listen(port);
console.log('Express started on port ' + port);
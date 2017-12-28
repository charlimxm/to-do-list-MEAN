var express = require('express');
var routes = require('./routes')
var user = require('./routes/users');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');

var app = express();

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'to-do-list');

var TodoSchema = require('./models/Todo.js').TodoSchema;
var Todo = db.model('todos', TodoSchema);

app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.favicon());
// app.use(express.morgan('dev'));
// app.use(express.bodyParser());
app.use(methodOverride('_method'));
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// var todos = [
//   { description : "Buy eggs",
//     due : new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // 1 day from now
//     done : false
//   },
//   { description : "Write next blog post",
//     due : new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
//     done : false
//   },
//   { description : "Build todo list app",
//     due : new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
//     done : true
//   },
// ];

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/', routes.index(Todo));
// app.get('/users', user.list);

app.post('/todo.json', routes.addTodo(Todo));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var mainRouter = require('./routes/main');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var comentariosRouter = require('./routes/comentarios')
const db = require('./database/models');
const users = db.usuarios //Es el alias del modelo

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  // el objeto literal tiene tres propiedades que siempre son las mismas
  secret: 'ComicsDB',
  resave: false,
  saveUninitialized: true
}))


//pasar datos de session a locals
app.use(function(req, res, next){
  res.locals.usuarios = req.session.usuario
  return next()
})
  
app.use(function(req, res, next){
  //chequear que no tengamos usuario en sessión y si tengamos cookie
  if(req.session.users == undefined && req.cookies.userId !== undefined){
    //Buscar el usario de la base de datos
       users.findByPk(req.cookies.userId)
            .then( function(users){
              //Dentro del then pasar al usario a req.session.user
              //Pasar al usuario locals.user
              // retornar next()
                req.session.users = users
                res.locals.users = users
              
                return next()

            })
            .catch( error => console.log(error))
          } else { //tiene que haber un else
            return next()
          }
})


app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/comentarios', comentariosRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

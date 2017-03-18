import express from 'express'
import bootstrap from './bootstrap/index'
import favicon from 'serve-favicon'
import path from 'path'

var app = express()
// 静态资源目录注册
app.use('/',express.static('static'))


bootstrap(app)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('common/error',err)
})

module.exports = app

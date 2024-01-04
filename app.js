var createError = require('http-errors');
var express = require('express');
const ejs = require('ejs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var indexRouter = require('./routes/index');
var configViewEngine = require('./config/views');
var usersRouter = require('./routes/users');
var authRouter=require('./routes/auth.routes');
var theloaiRouter=require('./routes/the_loai.routers');
var truyenRouter=require('./routes/truyen.routers');
var chuongRouter=require('./routes/chuong.routers');
var binluanRouter=require('./routes/binh_luan.routers');
var truyentheloaiRouter=require('./routes/truyen_the_loai.routers');
var nguoidungRouter=require('./routes/users');

var homerouter = require('./routes/all.routers');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


require('dotenv').config();
var morgan = require('morgan')
app.use((req, res, next) => {
  console.log('>>> run into my middleware')
  console.log(req.method)
  next();
})
app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);

app.use('/the_loai',theloaiRouter);
app.use('/truyen',truyenRouter);
app.use('/chuong',chuongRouter);
app.use('/binh_luan',binluanRouter);
app.use('/truyen_the_loai',truyentheloaiRouter);
app.use('/nguoi_dung',nguoidungRouter)
app.use('',homerouter)


app.use('/users', usersRouter);
app.use('/auth',authRouter)
app.use((req, res) => {
  return res.render('404.ejs')
})

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/open_home.`);
});

module.exports=app;
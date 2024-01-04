//import connection from './configs/connectDB';
var express = require('express');
//import configViewEngine from './configs/viewEngine';
var configViewEngine = require('./configs/viewEngine');
//import initWebRoute from './route/web';
var initWebRoute = require('./route/web');
//import initAPIRoute from './route/api';
// var initAPIRoute = require('./route/api');
//import connection from './configs/connectDB';
//var admin_index = require ('./route/admin_index.route')
var truyen_route = require ('./route/truyen_route')

require('dotenv').config();
var morgan = require('morgan')

const app = express();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
    //check => return res.send()
    console.log('>>> run into my middleware')
    console.log(req.method)
    next();
})

app.use(morgan('combined'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
configViewEngine(app);
initWebRoute(app);
//initAPIRoute(app);
//admin_index(app)
truyen_route(app)




//handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


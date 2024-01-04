var express = require('express');
const ejs = require('ejs');

const configViewEngine = (app) => {
    app.use(express.static('../public'))
    app.set("view engine", "ejs");
    app.set("views", "./views")
}

//export default configViewEngine;
module.exports = configViewEngine;

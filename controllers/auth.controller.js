const db = require("../models");
const config = require("../config/auth.config");
//const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const md5 = require("md5");
const { QueryTypes } = require('sequelize');
const { user} = require("../models");
const User = db.user;
const Truyen = db.truyen;
const Chuong=db.chuong;

exports.signin =  (req, res) => {
  const msv = req.body.username;
  const pwd = req.body.password;
  db.sequelize.query("select * from users where username='"+msv+"' and password='"+md5(pwd)+"'", {
      nest:true,
      type: QueryTypes.SELECT
    })
    .then(data => {
      if (!data[0]) {
        // console.log(data); 
        // console.log("Data : ", data[0])
        // console.log("Hashed password : ", md5(pwd))
        // res.send(data[0]);
        return res.status(403).send({});
      } else {
        // console.log(data);
        // console.log("Hashed password : ", md5(pwd))     
        var token = jwt.sign({
          User: data[0]
        }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        user.token = token;
        // res.status(200).send({
        //   User: data[0],
        //   accessToken: token
        // });
        Truyen.findAll().then(truyens => {
          res.send({
            User: data[0],
            accessToken: token,
            truyens,
          });
        });
        
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};
//================================================test============================================================================


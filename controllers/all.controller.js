const db = require("../models");
const Truyen = db.truyen;
const Chuong=db.chuong;
const The_loai = db.the_loai;
const Binh_Luan = db.binh_luan;
const User  = db.user;
//const Truyen_the_loai = db.truyen_the_loai;
const md5 = require("md5");
const { QueryTypes } = require('sequelize');
var bcrypt = require("bcryptjs");
const Op = db.Sequelize.Op;
const { getPagination, getPagingData } = require("./utils");


exports.Home =  (req,res) =>{
      Truyen.findAll(
        {
         include: [{
                model: Chuong
              }],
        }
      )
      .then(data => {
          res.render('home_user.ejs', { data_truyen: data })
      })
      .catch(err => {
          res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving truyens."
          });
      });   
}

exports.open_chi_tiet_truyen = (req, res) => {
    const id = req.params.id;

    Truyen.findByPk(id)
      .then((data) => {
        // const chuong = Chuong.find(({id_truyen_chuong : id}) );
    
        // if (chuong) {
          res.render('chi_tiet_truyen.ejs', {
             data_one_truyen: data,
            // ten_chuong: chuong,
          });
        // } else {
        //   res.status(404).send({
        //     message: 'Chapter not found',
        //   });
        // }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error retrieving truyen with id=${id}`,
        });
      });
};

  exports.dang_nhap = (req,res) =>{
    Truyen.findAll({})
    .then(data => {
        res.render('dang_nhap.ejs', { data_truyen: data })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });   
}

exports.dang_ky = (req,res) =>{
    Truyen.findAll({})
    .then(data => {
        res.render('dang_ky.ejs', { data_binh_luan: data })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });   
}

exports.truyen_the_loai = (req,res) =>{
    Truyen.findAll({})
    .then(data => {
       
        res.render('home_user.ejs', { data_the_loai: data })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });   
}



exports.create = (req, res) => { 
  
    const entity = {
        username: req.body.user_name,
        email: req.body.email,
        displayname: req.body.full_name,
        fistname: req.body.user_name,
        lastname: req.body.user_name,
        avartar:req.body.user_name,          
        password: md5(req.body.password, 8),
        roleid: 1,      
    };
    
    User.create(entity)
    .then(data => {
        res.render('dang_nhap.ejs', { data })
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the User."
        });
    });
  };

const db = require("../models");
const Truyen = db.truyen;
const Chuong=db.chuong;
const The_loai = db.the_loai;
const Binh_luan = db.binh_luan;
const Truyen_the_loai = db.truyen_the_loai
const Users = db.user
const Op = db.Sequelize.Op;
const { getPagination, getPagingData } = require("./utils");


exports.create = (req, res) => {
   
    if (!req.body.ten_chuong) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const chuong = {
        ten_chuong: req.body.ten_chuong,
        noi_dung: req.body.noi_dung,
        luot_xem_chuong: req.body.luot_xem_chuong,
        id_truyen_chuong: req.body.id_truyen_chuong
    };
    Chuong.create(chuong)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the truyen."
        });
    });
};

exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Chuong.findAll(
        {
            // include: [{// Notice `include` takes an ARRAY
            //   model: Tutorial
            // }]
          }
    )
    .then(data => {
        //res.send(data);
        res.render('truyen_admin.ejs', { data_chuong: data })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyen."
        });
    });
};

exports.findAllByPage = (req, res) => {
    const { page, size, ten_chuong } = req.query;
    var condition = ten_chuong ? { ten_chuong: { [Op.like]: `%${ten_chuong}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    Chuong.findAndCountAll({ 
        // include: [{// Notice `include` takes an ARRAY
        //     model: Tutorial
        //   }],
        where: condition, limit, offset })
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving truyen."
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Chuong.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving truyen with id=" + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Chuong.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "truyen was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update truyen with id=${id}. Maybe category was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating truyen with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Chuong.destroy({
      where: { id: id }
    })
    .then(num => {
        if (num == 1) {
             res.send({
             message: " successfully!"
             });
            // res.render('truyen_admin.ejs')
           
        } else {
            res.send({
            message: `Cannot delete truyen with id=${id}. Maybe truyen was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete truyen with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Chuong.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} truyen were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all truyen."
        });
    });
};

//=============================================================================


exports.open_them_sua_chuong = (req,res) =>{
    Truyen.findAll({})
    .then(data => {
       
        res.render('them_sua_chuong.ejs', { data_truyen: data, data_one_chuong:null })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });   
}

exports.them_sua_chuong = async (req, res) => {
    try {
      const data_truyen = await Truyen.findAll({});
      const id = req.params.id;
  
      let data = null;
      if (id !== 0) {
        data_one_chuong = await Chuong.findByPk(id);
      }
  
      Promise.all([data_truyen, data_one_chuong])
        .then((values) => {
          const [data_truyen, data_one_chuong] = values;
          res.render('them_sua_chuong.ejs', { data_one_chuong, data_truyen });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while retrieving truyens.",
          });
        });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving truyens.",
      });
    }
  };


  //======================mo trang khac==================================================================================================

exports.truyen = (req,res) =>{
    Truyen.findAll({})
    .then(data => {
        res.render('truyen_admin.ejs', { data_truyen: data })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });   
}

exports.chuong = (req,res) =>{
    Chuong.findAll({})
    .then(data => {
        res.render('chuong_admin.ejs', { data_chuong: data })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });   
}

exports.the_loai = (req,res) =>{
    The_loai.findAll({})
    .then(data => {
        res.render('the_loai_admin.ejs', { data_the_loai: data })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });   
}

exports.binh_luan = (req,res) =>{
    Binh_luan.findAll({})
    .then(data => {
        res.render('binh_luan_admin.ejs', { data_binh_luan: data })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });   
}

exports.users = (req,res) =>{
    Users.findAll({})
    .then(data => {
        res.render('user_admin.ejs', { data_users: data })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });   
}

exports.dang_nhap = (req,res) =>{
    Binh_luan.findAll({})
    .then(data => {
        res.render('dang_nhap.ejs', { data_binh_luan: data })
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
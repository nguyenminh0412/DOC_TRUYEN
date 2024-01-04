const db = require("../models");
const Truyen = db.truyen;
const Chuong=db.chuong;
const The_loai = db.the_loai;
const Binh_luan = db.binh_luan;
const Truyen_the_loai = db.truyen_the_loai
const Users = db.user
//const Truyen_the_loai = db.truyen_the_loai;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData } = require("./utils");


exports.create = (req, res) => {
    
    if (!req.body.ten_truyen) {
      res.status(400).send({
        message: "ten tuyen khong duoc de trong !"
      });
      return;
    }
    
    const truyen = {
      ten_truyen: req.body.ten_truyen,
      tac_gia: req.body.tac_gia,
      tinh_trang: req.body.tinh_trang,
      gioi_thieu: req.body.gioi_thieu,
      luot_xem_truyen: 0, 
      luot_thich_truyen: 0, 
    };
  
    
    Truyen.create(truyen)
      .then(data => {
         res.send(data);
       // res.render('truyen_admin.ejs')
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the truyen."
        });
      });
  };

exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Truyen.findAll(
        {
            include: [{
                model: Chuong
              }],
          }
    )
    .then(data => {
        //res.send(data);
        res.render('truyen_admin.ejs', { data_truyen: data })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });
};

exports.findAllByPage = (req, res) => {
    const { page, size, ten_truyen } = req.query;
    var condition = ten_truyen ? { ten_truyen: { [Op.like]: `%${ten_truyen}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    Truyen.findAndCountAll({ 
        include: [{
            // Notice `include` takes an ARRAY
            model: Chuong
          }],
        where: condition, limit, offset })
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Truyen.findByPk(id)
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
    Truyen.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "truyen was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update truyen with id=${id}. Maybe truyen was not found or req.body is empty!`
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
    Truyen.destroy({
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
    Truyen.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} truyens were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all truyens."
        });
    });
};

exports.createtruyen = (req,res) =>{
    The_loai.findAll({})
    .then(data => {
       
        res.render('them_sua_truyen.ejs', { data_the_loai: data })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });   
}

exports.them_sua_truyen = async (req, res) => {
    try {
      const data_the_loai = await The_loai.findAll({});
      const id = req.params.id;
  
      let data = null;
      if (id !== 0) {
        data_one_truyen = await Truyen.findByPk(id);
      }
  
      Promise.all([data_the_loai, data_one_truyen])
        .then((values) => {
          const [data_the_loai, data_one_truyen] = values;
          res.render('them_sua_truyen.ejs', { data_one_truyen, data_the_loai });
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


exports.them_chuong = async (req, res) => {
    Truyen.findAll({})
    .then(data => {
        res.render('them_sua_chuong.ejs', { data_truyen: data.id, data_one_chuong:null })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });   
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

exports.test = (req, res) => {
    Truyen.findAll({
        include: [
          {
            model: Truyen_the_loai,
            include: {
              model: The_loai,
              as: "the_loai",
              attributes: ["ten_the_loai"],
            },
          },
        ],
      })
      .then((data) => {
        res.send(data);
        // hoặc bạn có thể res.render('truyen_admin.ejs', { data_truyen: data })
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving truyens.",
        });
      });
  };
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
    // Validate request
    if (!req.body.ten_the_loai) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a category
    const the_loai = {
        ten_the_loai: req.body.ten_the_loai
              
    };
    // Save category in the database
    The_loai.create(the_loai)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the the loai."
        });
    });
};

exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    The_loai.findAll(
        {
            // include: [{// Notice `include` takes an ARRAY
            //   model: Tutorial
            // }]
          }
    )
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving the loai."
        });
    });
};

exports.findAllByPage = (req, res) => {
    const { page, size, ten_the_loai } = req.query;
    var condition = ten_the_loai ? { ten_the_loai: { [Op.like]: `%${ten_the_loai}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    The_loai.findAndCountAll({ 
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
            err.message || "Some error occurred while retrieving the loai."
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    The_loai.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving the loai with id=" + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    The_loai.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "the loai was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update the loai with id=${id}. Maybe the loai was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating the loai with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    The_loai.destroy({
      where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "the loai was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete the loai with id=${id}. Maybe the loai was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete the loai with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    The_loai.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} the loai were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all the loai."
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
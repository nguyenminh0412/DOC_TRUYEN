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
    if (!req.body.id_truyen) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a category
    const truyen_the_loai = {
        id_truyen : req.body.id_truyen,
        id_the_loai: req.body.id_the_loai
        
              
    };
    // Save category in the database
    Truyen_the_loai.create(truyen_the_loai)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the category."
        });
    });
};

exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Truyen_the_loai.findAll(
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
            err.message || "Some error occurred while retrieving categorys."
        });
    });
};

exports.findAllByPage = (req, res) => {
    const { page, size, truyenId } = req.query;
    var condition = truyenId ? { truyenId: { [Op.like]: `%${truyenId}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    Truyen_the_loai.findAndCountAll({ 
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
            err.message || "Some error occurred while retrieving categorys."
        });
    });
}

exports.findOne = (req, res) => {
    const truyenId = req.params.truyenId;
    Truyen_the_loai.findByPk(truyenId)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving category with truyenId=" + truyenId
        });
    });
};

exports.update = (req, res) => {
    const truyenId = req.params.truyenId;
    Truyen_the_loai.update(req.body, {
        where: { truyenId: truyenId }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "category was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update category with id=${truyenId}. Maybe category was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating category with id=" + truyenId
        });
    });
};

exports.delete = (req, res) => {
    const truyenId = req.params.truyenId;
    Truyen_the_loai.destroy({
      where: { truyenId: truyenId }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "category was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete category with truyenId=${truyenId}. Maybe category was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete category with truyenId=" + truyenId
        });
    });
};

exports.deleteAll = (req, res) => {
    Truyen_the_loai.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} categorys were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all categorys."
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
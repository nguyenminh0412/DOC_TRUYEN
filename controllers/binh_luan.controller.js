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
    if (!req.body.noi_dung_binh_luan) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a category
    const binh_luan = {
        noi_dung_binh_luan: req.body.noi_dung_binh_luan,
        luot_thich_binh_luan: req.body.luot_thich_binh_luan,
        id_truyen_binh_luan: req.body.id_truyen_binh_luan,
        id_user_binh_luan: req.body.id_user_binh_luan
              
    };
    // Save category in the database
    Binh_luan.create(binh_luan)
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
    Binh_luan.findAll({
        include: [    
            { model: Truyen },
          ]
     })
    .then(data => {
        res.send(data);
        //res.render('truyen_admin.ejs', { data_binh_luan: data })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving truyens."
        });
    });
};

exports.findAllByPage = (req, res) => {
    const { page, size, noi_dung_binh_luan } = req.query;
    var condition = noi_dung_binh_luan ? { noi_dung_binh_luan: { [Op.like]: `%${noi_dung_binh_luan}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    Binh_luan.findAndCountAll({ 
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
    const id = req.params.id;
    Binh_luan.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving category with id=" + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Binh_luan.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "category was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update category with id=${id}. Maybe category was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating category with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Binh_luan.destroy({
      where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "category was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete category with id=${id}. Maybe category was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete category with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Binh_luan.destroy({
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

//======================mo trang khac====================================================================================
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
    Binh_luan.findAll({
        include: [
            { model: Chuong },
            { model: Truyen },
            { model: User }
          ]
    })
    .then(data => {
        
        res.render('binh_luan_admin.ejs', { data_binh_luan: data });
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
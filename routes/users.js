// var express = require('express');
// var router = express.Router();
const users = require('../controllers/user.controllers.js');
var router = require("express").Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/api/getall', users.findbyQuery);
router.put("/api/user/:id", users.update);
router.post("/api/user", users.create);
router.delete("/api/user/:id", users.delete); 

router.get("/open_truyen", users.truyen);
router.get("/open_chuong", users.chuong);
router.get("/open_the_loai", users.the_loai);
router.get("/open_binh_luan", users.binh_luan);

router.get("/open_nguoi_dung",users.users)
router.get("/dang_nhap", users.dang_nhap);
router.get("/dang_ky", users.dang_ky);


router.post("/create_user", users.create);
module.exports = router;
const binh_luan = require("../controllers/binh_luan.controller.js");
var router = require("express").Router();
router.post("/createbinhluan", binh_luan.create);
router.get("/getall", binh_luan.findAll);
router.get("/getbypage", binh_luan.findAllByPage);
router.get("/getonebinhluan/:id", binh_luan.findOne);
router.put("/updatebinhluan/:id", binh_luan.update);
router.delete("/deletebinhluan/:id", binh_luan.delete);
router.delete("/", binh_luan.deleteAll);


//=============== mo trang khac===============================================

router.get("/open_truyen", binh_luan.truyen);
router.get("/open_chuong", binh_luan.chuong);
router.get("/open_the_loai", binh_luan.the_loai);
router.get("/open_binh_luan", binh_luan.binh_luan);
router.get("/open_nguoi_dung",binh_luan.users)
router.get("/dang_nhap", binh_luan.dang_nhap);
router.get("/dang_ky", binh_luan.dang_ky);


module.exports = router;
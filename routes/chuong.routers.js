const chuong = require("../controllers/chuong.controller.js");
var router = require("express").Router();

router.post("/createchuong", chuong.create);
router.get("/getall", chuong.findAll);
router.get("/getbypage", chuong.findAllByPage);
router.get("/getonechuong/:id", chuong.findOne);
router.put("/updatechuong/:id", chuong.update);
router.delete("/deletechuong/:id", chuong.delete);
router.delete("/", chuong.deleteAll);


router.get("/open_them_sua_chuong", chuong.open_them_sua_chuong);
router.get("/them_sua_chuong:id", chuong.them_sua_chuong);


//=============== mo trang khac===============================================

router.get("/open_truyen", chuong.truyen);
router.get("/open_chuong", chuong.chuong);
router.get("/open_the_loai", chuong.the_loai);
router.get("/open_binh_luan", chuong.binh_luan);
router.get("/open_nguoi_dung",chuong.users)
router.get("/dang_nhap", chuong.dang_nhap);
router.get("/dang_ky", chuong.dang_ky);

module.exports = router;

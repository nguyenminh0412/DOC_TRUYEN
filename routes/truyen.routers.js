const truyen = require("../controllers/truyen.controller.js");
var router = require("express").Router();

router.get("/createtruyen", truyen.createtruyen);
router.get("/getall", truyen.findAll);
router.post("/createnew", truyen.create);    
router.get("getbypage", truyen.findAllByPage);
router.get("/getonetruyen/:id", truyen.findOne);
router.put("/updatetruyen/:id", truyen.update);
router.delete("/deletetruyen/:id", truyen.delete);
router.delete("/", truyen.deleteAll);
router.get("/them_sua_truyen:id", truyen.them_sua_truyen);
router.get("/them_chuong:id", truyen.them_chuong);

//=============== mo trang khac===============================================

router.get("/open_truyen", truyen.truyen);
router.get("/open_chuong", truyen.chuong);
router.get("/open_the_loai", truyen.the_loai);
router.get("/open_binh_luan", truyen.binh_luan);
router.get("/open_nguoi_dung",truyen.users)
router.get("/dang_nhap", truyen.dang_nhap);
router.get("/dang_ky", truyen.dang_ky);


router.get("/open_truyen_test", truyen.test);

module.exports = router;
const the_loai = require("../controllers/the_loai.controller.js");
var router = require("express").Router();

router.post("/create_the_loai", the_loai.create);

router.get("/getall", the_loai.findAll);
router.get("/getbypage", the_loai.findAllByPage);
router.get("/get_one_the_loai/:id", the_loai.findOne);
router.put("/update_the_loai/:id", the_loai.update);
router.delete("/delete_the_loai/:id", the_loai.delete);
router.delete("/", the_loai.deleteAll);

router.get("/open_truyen", the_loai.truyen);
router.get("/open_chuong", the_loai.chuong);
router.get("/open_the_loai", the_loai.the_loai);
router.get("/open_binh_luan", the_loai.binh_luan);
router.get("/open_nguoi_dung",the_loai.users)
router.get("/dang_nhap", the_loai.dang_nhap);
router.get("/dang_ky", the_loai.dang_ky);

module.exports = router;
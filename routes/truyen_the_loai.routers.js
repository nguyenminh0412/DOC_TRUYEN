const truyen_the_loai = require("../controllers/truyen_the_loai.controller.js");
var router = require("express").Router();

router.post("/", truyen_the_loai.create);
router.get("/getall", truyen_the_loai.findAll);
router.get("/getbypage", truyen_the_loai.findAllByPage);
router.get("/:truyenId", truyen_the_loai.findOne);
router.put("/:truyenId", truyen_the_loai.update);
router.delete("/:truyenId", truyen_the_loai.delete);
router.delete("/", truyen_the_loai.deleteAll);

router.get("/open_truyen", truyen_the_loai.truyen);
router.get("/open_chuong", truyen_the_loai.chuong);
router.get("/open_the_loai", truyen_the_loai.the_loai);
router.get("/open_binh_luan", truyen_the_loai.binh_luan);
router.get("/open_nguoi_dung",truyen_the_loai.users)
router.get("/dang_nhap", truyen_the_loai.dang_nhap);
router.get("/dang_ky", truyen_the_loai.dang_ky);

module.exports = router;
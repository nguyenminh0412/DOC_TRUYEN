
const home = require("../controllers/all.controller.js");
var router = require("express").Router();


//=================home=============================================



router.get("/open_home", home.Home);
router.get("/open_chi_tiet_truyen:id", home.open_chi_tiet_truyen);
router.get("/open_dang_nhap", home.dang_nhap);
router.get("/open_dang_ky", home.dang_ky);
router.post("/dangky", home.create)

module.exports = router;
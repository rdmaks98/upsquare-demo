const router = require("express").Router();
const Imagecontroller = require("../controller/index");
const upload = require("../utils/multer");

router.post("/", upload.single("picture"), Imagecontroller.Images);
router.get("/", Imagecontroller.getImages);
router.delete("/:id", Imagecontroller.deleteImage);
router.put("/:id", upload.single("picture"),Imagecontroller.updateImage);
module.exports = router;
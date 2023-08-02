const express = require("express");
const router = express.Router();
let userController = require("../controllers/article");

router.get('/get/:query?', userController.getAllArticle);
router.post('/add', userController.postArticle);

module.exports = router
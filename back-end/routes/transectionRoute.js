const express = require('express');
const { loginController, registerController } = require('../controllers/userController');
const { getAllTransection, addTransection } = require('../controllers/transectionController');

const router = express.Router();

router.post("add-transection",addTransection)
router.post("get-transection",getAllTransection);



module.exports=router
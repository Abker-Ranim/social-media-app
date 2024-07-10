const express = require('express');
const router = express.Router();

const PersonController = require('../controllers/person');


router.get("/", PersonController.person_get_all);
router.post("/", PersonController.person_create);



module.exports = router;
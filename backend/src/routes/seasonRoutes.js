const express = require('express');
const router = express.Router();
const seasonController = require('../controllers/seasonController');

router.get('/', seasonController.getSeasons);
router.get('/:season/categories', seasonController.getCategoriesBySeason);
router.get('/:season/categories/:category', seasonController.getCategoryDetail);

module.exports = router;

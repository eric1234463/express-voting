const express = require('express');
const CampaignController = require('../controllers/CampaignController');
const router = express.Router();


router.use('/', CampaignController.show);

module.exports = router;

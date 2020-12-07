const express = require('express');
const CampaignController = require('../controllers/CampaignController');
const VoteController = require('../controllers/VoteController');

const router = express.Router();

router.get('/:id', CampaignController.show);
router.get('/', CampaignController.index);
router.post('/', CampaignController.create);
router.post('/:id/votes', VoteController.create);

module.exports = router;

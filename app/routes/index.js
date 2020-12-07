const express = require('express');
const campaignRoutes = require('./campaign');
const router = express.Router();

router.use('/campaigns', campaignRoutes);

module.exports = router;

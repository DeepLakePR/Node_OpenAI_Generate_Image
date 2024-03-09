const express = require('express');
const { generateImage } = require('../controllers/openai-controller');
const router = express.Router();

// POST The GenerateImage
router.post('/generateimage', generateImage);

module.exports = router;

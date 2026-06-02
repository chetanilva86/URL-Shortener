const express = require('express');
const {  handleGenerateNewShortURL,handlegetAnalytics } = require('../controllers/url');

const router = express.Router();
router.post('/', handleGenerateNewShortURL);


router.get('/analytics/:shortId', handlegetAnalytics )


module.exports = router; 
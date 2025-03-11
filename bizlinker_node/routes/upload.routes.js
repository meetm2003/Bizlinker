const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/upload.controller');
const upload = require('../utils/multerConfig');

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
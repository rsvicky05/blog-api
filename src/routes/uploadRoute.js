const express = require('express');
const {uploadfile, uploadfiles} = require('../controller/uploadController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.get('/file', upload.single('image') ,uploadfile);
router.get('/files', upload.array('images'), uploadfiles);

module.exports = router;
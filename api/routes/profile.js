
const express = require('express');
const router = express.Router(); 

const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
 
const ProfileController = require('../controller/profile');

const storageConf = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './profiles/');
    },
    filename: function (req, file, cb) {

        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    //reject File
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File not found'), false);
    }
}

const upload = multer({
    storage: storageConf,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
});


router.get('/:profileId', ProfileController.get_by_id)

router.post('/profile', upload.single('foto'), ProfileController.add_profile);

router.patch('/:profileId', upload.single('foto'),   ProfileController.update);




module.exports = router;
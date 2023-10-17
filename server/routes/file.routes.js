const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const fileController = require('../controllers/fileController');


//add authMiddleware to recognize user using token
router.post('', authMiddleware, fileController.createDir);

router.get('', authMiddleware, fileController.getFiles);


module.exports = router;
const express = require('express');
const { resgisterUser, authUser, allUsers, editUser } = require('../controllers/userControllers');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware')


router.route('/').post(resgisterUser).get(protect, allUsers).patch(protect, editUser);
router.post('/login', authUser);

module.exports = router;
const express = require('express')
const router = express.Router();
const { allUsers, userByEmail, userByID, login, signup, newsLetter, updateProfile, deleteUser } = require('../controllers/usercontroller')


router.get('/all-users', allUsers);
router.get('/user-by-email', userByEmail)
router.get('/user-by-id/:id',userByID)

router.post('/login', login)
router.post('/signup', signup)
router.post('/news-letter', newsLetter)

router.put('/update-profile', updateProfile)

router.delete('/delete-user', deleteUser)

module.exports = router; 
const express = require('express');
const router = express.Router();

const {
  saveUser,
  getUserByEmail,
  updateUser,
} = require('../controllers/userController');

router.post('/', saveUser);          // POST /users
router.get('/:email', getUserByEmail); // GET /users/:email
router.put('/:email', updateUser);   // PUT /users/:email

module.exports = router;
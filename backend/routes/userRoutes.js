const express = require('express');
const router = express.Router();

const {
  saveUser,
  getUserByEmail,
} = require('../controllers/userController');

router.post('/', saveUser);          // POST /users
router.get('/:email', getUserByEmail); // GET /users/:email

module.exports = router;
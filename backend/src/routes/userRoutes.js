const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const upload = require('../config/multerConfig');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', upload.single('profile_image'), createUser);
router.put('/:id', upload.single('profile_image'), updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

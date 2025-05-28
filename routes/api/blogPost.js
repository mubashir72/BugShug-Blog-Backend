const express = require('express');
const router = express.Router();
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const {
  createNewPost,
  getAllPost,
  updatePost,
  deletePost,
  getPost,
} = require('../../controllers/blogPostController');
router
  .route('/')
  .get(getAllPost)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewPost)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updatePost)
  .delete(verifyRoles(ROLES_LIST.Admin), deletePost);
router.route('/:id').get(getPost);
module.exports = router;

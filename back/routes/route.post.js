const express = require("express");
const router = express.Router();

const {createPost, getPost, updatePost, deletePost, likePost, getTimelinePosts} = require('../controller/controller.post')

router.post("/" , createPost)
router.get("/:id" , getPost)
router.put("/:id" , updatePost)
router.delete("/:id" , deletePost)
router.put("/:id/like" , likePost)
router.get("/:id/timeline" , getTimelinePosts)

module.exports = router;

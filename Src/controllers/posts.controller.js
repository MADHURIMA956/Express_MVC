const express = require('express');
const Post = require('../models/posts.model');

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const posts = await Post.create(req.body);
		return res.status(201).send(posts);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

/*

=> Before creating any post you need to create some tags and users which you want to include with this post and then
provide those tag id's and user id to this post body while creating new post.

E.g Post:- 

 {
   "title": "What is ReactJS?",
   "body": "ReactJS is a JavaScript framework for developing blazing fast frontend web-pages.",
   "user_id":"61a2f1253af515ab0ded9f0a",
   "tag_ids":["61a2f25e71c89e4981c31b4b", "61a2f26971c89e4981c31b4d"]
 } 
 
*/
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find({})
			.populate('tag_ids', 'name')
			.populate('user_id')
			.lean()
			.exec();
		return res.send(posts);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const posts = await Post.findById(req.params.id).lean().exec();
		return res.send(posts);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
			.lean()
			.exec();
		return res.send(posts);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const posts = await Post.findByIdAndDelete(req.params.id).lean().exec();
		return res.send(posts);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

module.exports = router;

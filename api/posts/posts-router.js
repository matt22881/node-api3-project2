const express = require('express')

const Users = require('./../users/users-model')
const Posts = require('./posts-model')

const { validateUserId, validateUser, validatePostId, validatePost } = require('./../middleware/middleware')

const router = express.Router()

router.get('/', (req, res) => {
    Posts.get()
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            console.error('err fetching the posts: ', err)
            res.status(500).json({message: 'error fetching the posts'})
        })
})

router.get('/:id', validatePostId, (req, res) => {
    Posts.getById(req.params.id)
        .then(post => {
            res.json(post)
        })
        .catch(err => {
            console.error('err fetching the post: ', err)
            res.status(500).json({message: 'error fetching the post'})
        })
})

router.post('/', validatePost, (req, res) => {
    Posts.insert(req.body)
        .then(post =>  {
            res.json(post)
        })
        .catch(err => {
            console.error('error inserting the post: ', err)
            res.status(500).json({message: 'error posting comment'})
        })
})

router.put('/:id', validatePostId, validatePost, (req, res) => {
    Posts.update(req.params.id, req.body)
    .then(post => {
        res.json(post)
    })
    .catch(err => {
        console.error('err updating post: ', err)
        res.status(500).json({message: 'error updating post'})
    })
})

router.delete('/:id', validatePostId, (req, res) => {
    Posts.remove(req.params.id)
        .then(() => {
            res.json(req.post)
        })
        .catch(err => {
            res.status(500).json({message:"There was an error removing the post", error: err})
        })
})

module.exports = router
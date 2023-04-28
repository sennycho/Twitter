import express from 'express';
import * as tweetController from '../controller/tweet.js';

const router = express.Router();

// GET
// /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET 
// /tweets/:id
router.get('/:id', tweetController.getTweet)

//POST
router.post('/', tweetController.createTweet)

//PUT
//text만 수정
router.put('/:id', tweetController.updateTweet);

//DELETE
router.delete('/:id', tweetController.deleteTweet);


export default router;
import express from 'express';
import * as tweetController from '../controller/tweet.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateTweet = [
    body('text')
        .trim()
        .isLength({min: 4})
        .withMessage('text는 최소 4자 이상 입력하세요'),
    validate
]

// GET
// /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET 
// /tweets/:id
router.get('/:id', tweetController.getTweet,)

// text가 4자 이하인 경우 에러처리
//POST
router.post('/', validateTweet, tweetController.createTweet, )

//PUT
//text만 수정
router.put('/:id', tweetController.updateTweet);

//DELETE
router.delete('/:id', tweetController.deleteTweet);


export default router;
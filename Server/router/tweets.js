import express from 'express';

let tweets = [
    {
        id: '1',
        text: '첫 트윗입니다!!',
        createdAt: Date.now().toString(),
        name: 'apple',
        username: '김사과',
        url: ''
    },
    {
        id:'2',
        text: '안녕하세요!!',
        createdAt: Date.now().toString(),
        name:'banana',
        username: '반하나',
        url: ''
    }
];
const router = express.Router();

// GET
// /tweets?username=:username
router.get('/', (req, res, next) => {
    const username = req.query.username;
    const data = username
        ? tweets.filter((tweet) => tweet.username === username)
        : tweets;
    res.status(200).json(data);
})

// GET 
// /tweets/:id
router.get('/:id', (req, res, next) =>{
    const id = req.params.id;
    const tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }
})

//POST
router.post('/', (req, res, next) => {
    const { text, name, username} = req.body
    const tweet = {
        id:  Date.now().toString(), 
        text, 
        createAt: new Date(), 
        name, 
        username 
    }
    tweets = [tweet, ... tweets]
    res.status(201).json(tweet)
})

//PUT
//text만 수정
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text = text;
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }


})

//DELETE
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter((tweet) => tweet.id !== id);
    res.sendStatus(204)
})

export default router;
import { db } from '../db/database.js';
import * as userRepository from './auth.js';  

// let tweets = [
//     {
//         id:'1',
//         text:'첫 트윗입니다.',
//         createdAt: Date.now().toString(),
//         userId: '1'
//     },
//     {
//         id:'2',
//         text:'안녕하세요.',
//         createdAt: Date.now().toString(),
//         userId: '1'
//         // name: 'Banana',
//         // username: '반하나',
//         // url: ''
//     }
// ];

const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw left outer join users as us on tw.userId = us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt desc';

export async function getAll(){
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
    .then((result) => result[0]);

    // return Promise.all(
    //     tweets.map(async (tweet) => {
    //         const {username, name, url} = await userRepository.findById(tweet.userId);
    //         return {...tweet, username, name, url }
    //     })
    // )
}

export async function getAllByUsername(username){
    return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
    .then((result) => result[0]);

    // return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
}

export async function getById(id) {
    return db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]).then((result) => result[0][0])
}

export async function create(text, userId){
    return db.execute('insert into tweets(text, createdAt, userId) values (?,?,?)', [text, new Date(), userId]).then((result) => console.log(result))
}
export async function update(id, text) {
    return db.execute('update tweets SET text=? where id=?', [text, id]).then(() => getById(id))
}
export async function remove(id){
    return db.execute('delete from tweets where id=?', [id]);
}
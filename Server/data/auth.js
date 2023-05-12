import { getUsers } from "../db/database.js";
import MongoDb from 'mongodb';
// 데이터가 추가될때마다 객체가 저장되듯 저장됨
const ObjectID = MongoDb.ObjectId;


export async function findByUsername(username) {
    return getUsers().find({username})
    .next()
    .then(mapOptionalUser);
}

export async function createUser(user) {
    return getUsers().insertOne(user)
    .then((result) => {
        console.log(result);
        // result.ops[0]._id.toString();
    });
}


export async function findById(id) {
    return getUsers()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalUser);
}

function mapOptionalUser(user){
    return user ? { ...user, id: user._id.toString() } : user;
}
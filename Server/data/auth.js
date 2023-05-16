import Mongoose from "mongoose";
import { useVirtualId } from '../db/database.js';

const userSchema = new Mongoose.Schema({
    username: { type:String, required: true },
    name: { type:String, required: true },
    email: { type:String, required: true },
    password: { type:String, required: true },
    url: String
});

useVirtualId(userSchema);
const User = Mongoose.model('User', userSchema); //컬렉션 이름 user 뒤에 s가 붙어서 users가 됨

export async function findByUsername(username) {
    return User.findOne( { username } );
}

export async function createUser(user) {
    return new User(user).save().then((data) => data.id);
}


export async function findById(id) {
    return User.findById(id);
}

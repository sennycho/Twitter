import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';    // ../ => 지금파일 밖으로 나가서 가져온다는 뜻

const AUTH_ERROR = { message: '인증 에러!'};

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!(authHeader && authHeader.startsWith('Bearer '))){
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        '*zFviDLME1lZRWWn!7e$bVi4*Go5@Z@T',  // secret key
        async (error, decoded) => {
            if(error){
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await userRepository.findById(decoded.id);
            if(!user){
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id;
            next();
        }
    )
}
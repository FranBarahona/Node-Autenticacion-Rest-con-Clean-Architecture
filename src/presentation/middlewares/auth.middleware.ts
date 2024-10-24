import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';


export class AuthMiddleware {
    static  validateJWT = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ').at(1) ?? '';
            if (!token) {
                return res.status(401).json({ message: 'Auth failed' });
            }

            
            const payload = await JwtAdapter.verifyToken<{id:string}>(token);
            if(!payload){
                return res.status(401).json({ message: 'Invalid token' });
            }

            const user = await UserModel.findById(payload.id);
            if(!user){
                return res.status(401).json({ message: 'User not found' });
            }
            req.body.user = user;

            next();
        } catch (error) {
            return res.status(500).json({ message: 'Auth error failed' });
        }
    }
}
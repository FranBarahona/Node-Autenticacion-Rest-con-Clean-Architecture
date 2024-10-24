import jwt from 'jsonwebtoken';

const JWT_SEED = process.env.JWT_SEED || 'SEED';
export class JwtAdapter {
   
    static async generateToken(payload:Object, duration:string = '2h'): Promise<string|null>{

        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED , {
                expiresIn: duration
            }, (err, token) => {
                if(err){
                    resolve(null);
                }
                resolve(token!);
            }
            
        )});

    }

    static async verifyToken<T>(token:string): Promise<T | null>{
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if(err){
                    resolve(null);
                }
                resolve(decoded as T);
            });
        });
    }

}
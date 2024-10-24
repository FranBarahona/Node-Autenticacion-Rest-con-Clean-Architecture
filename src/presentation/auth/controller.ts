import { Request, Response } from 'express';
import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto } from '../../domain';
import { UserModel } from '../../data/mongodb';

export class AuthController {

    constructor(
        private readonly authRepository: AuthRepository
    ) {}
    private handlerError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

     registerUser = async (req: Request, res: Response) => {
        const [errorDto, registerUserDto] = RegisterUserDto.create(req.body);
        if(errorDto) {
            return res.status(400).json({message: errorDto});
        }
        
         new RegisterUser(this.authRepository).execute(registerUserDto!)
         .then(data => res.json(data))
         .catch(err => this.handlerError(err, res));
        
    }

    loginUser = (req: Request, res: Response) => {
        const [errorDto, loginUserDto] = LoginUserDto.login(req.body);

        if(errorDto) {
            return res.status(400).json({message: errorDto});
        }
        new LoginUser(this.authRepository).execute(loginUserDto!)
        .then(data => res.json(data))
        .catch(err => this.handlerError(err, res));
    }

    getUsers = (req: Request, res: Response) => {
        UserModel.find()
        .then(users => res.json({user:req.body.user}))
        .catch(err => this.handlerError(err, res));
        
    }
}
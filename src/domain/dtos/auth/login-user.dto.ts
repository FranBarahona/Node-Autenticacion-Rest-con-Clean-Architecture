import { Validators } from "../../../config";

interface LoginUserInput {
    email: string;
    password: string;
}




export class LoginUserDto{
    private constructor(
        public readonly email: string,
        public readonly password: string
    ){}

    static login(input:LoginUserInput):[string | undefined, LoginUserDto | undefined]{
        const {email, password} = input;

        if(email){
            if(!Validators.email.test(email)){
                return ['Invalid email', undefined];
            }
        }else{
            return ['Missing email', undefined];
        }
        if(password){
            if(!Validators.password.test(password)){
                return ['Invalid password', undefined];
            }
        }else{
            return ['Missing password', undefined];

        }
        return [undefined, new LoginUserDto(email, password)];
    }
}
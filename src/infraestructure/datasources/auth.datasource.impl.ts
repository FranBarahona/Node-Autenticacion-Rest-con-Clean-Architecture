import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { BcryptAdapter } from "../../config";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

  constructor(
    private readonly hashPassword: HashFunction,
    private readonly comparePassword: CompareFunction
    
  ) {
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
   const { email, password, name } = registerUserDto;

   try {
    
    //1. verificar si existe el correo
    const exist = await UserModel.findOne({email});

    if(exist){
      throw CustomError.badRequest('Email already exist');
    }



    const user = await UserModel.create({email,password: this.hashPassword(password), name});
   

    //3. mappear respuesta a nuestra entidad

    await user.save();

    return UserMapper.userEntityFromObject(user);
   } catch (error) {
    if(error instanceof CustomError){
      throw error;
    }
    throw CustomError.internalError();
   }
  }

  async login(loginUserDto:LoginUserDto):Promise<UserEntity>{
    const {email, password} = loginUserDto;
    try {
      const user = await UserModel.findOne({email});

      if(!user){
        throw CustomError.badRequest('Bad credentials email');
      }

      if(this.comparePassword(password, user.password)){
        return UserMapper.userEntityFromObject(user);
      }else{
        throw CustomError.badRequest('Bad credentials pass');
      }
      
    } catch (error) {
      if(error instanceof CustomError){
        throw error;
      }
      throw CustomError.internalError();
    }
   
  }


}
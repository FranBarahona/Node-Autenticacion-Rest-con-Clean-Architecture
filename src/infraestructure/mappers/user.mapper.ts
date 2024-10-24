import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
    static userEntityFromObject(object:{
        [key:string]:any
    }) {
        const {id, _id,name, email, password, roles}= object;
        if(!_id || !id){
            throw CustomError.badRequest('Id is required');
        }
        if(!email){
            throw CustomError.badRequest('Email is required');
        }
        if(!password){
            throw CustomError.badRequest('Password is required');
        }
        if(!roles){
            throw CustomError.badRequest('Roles is required');
        }
        if(!name){
            throw CustomError.badRequest('Name is required');
        }
        return new UserEntity(id,name,email,password,roles);
       
    }
}
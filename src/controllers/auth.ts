import { IUsersModel, Users } from '../models/users.model'
import { usersValidation } from '../validations/users.validation'
import { JwtHelpers } from '../helpers/jwt.helper'

export default class AuthService {
  
  // create function for register new users
  public registerUsers = async (request: any): Promise<any> => {
    
    const response: any = {status: 201}
    try {
      const validate = await usersValidation.registerUsersValidation(request)  // validate request params
      let alreadyExist = await Users.findOne({email: validate.email})  // check already exists with same email
      if(alreadyExist && alreadyExist._id) {
        response.status = 500
        response.data = await alreadyExist.toJSON()
        response.error = {message: "User already exists"}  // return response if already exists
      } else {
        const data: IUsersModel = new Users(validate);  // create object for user
        let userData = await data.save();  // save the data
        response.data = await userData.toJSON()
      }
    } catch (e : any) {
      response.status = 500
      response.error = e
    }
    return response;  // return response
  }
  
  // create function for login users
  public login = async (request: any): Promise<any> => {
    
    const response: any = {status: 201}
    try {
      const validate = await usersValidation.loginValidation(request)  // validate request params
      let userData = await Users.findOne({email: validate.email})  // check user exists with email
      if(!userData) {
        response.status = 500
        response.error = {message: "User doesn't exists"}  // return response if doesn't exists
      } else {
        let comparison = await userData.comparePassword(validate.password);
        if(comparison) {
          response.token = JwtHelpers.issue({ id: userData._id, role: userData.role }, '1d'),
          response.user = await userData.toJSON();
          response.message = 'Login successfully'
        } else {
          response.error = {message: "Wrong password"}  // return response if wrong password
        }
      }
    } catch (e) {
      response.status = 500
      response.error = e
    }
    return response;  // return response
  }
}


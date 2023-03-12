import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

class JwtHelper {
  public issue = (payload: object, expiresIn: any) : string =>  {
    let secret = process.env.SECRET ? process.env.SECRET : 'secretkey';
    return jwt.sign(payload, secret , {
      expiresIn,
    });
  }
};
export const JwtHelpers = new JwtHelper()
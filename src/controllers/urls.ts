import { IUrlModel, Urls } from '../models/urls.model'
import { UrlsValidations } from '../validations/urls.validation'
import shortId from 'shortid'

export default class CategoryService {
  
  // function for get long url
  public getUrl = async (request: any): Promise<any> => {
    
    const response: any = {status: 200}
    try {
        var data = await Urls.findOne({code: request.code})   // get url data
        if(data && data._id) {
          response.data = data
        } else {
          response.status = 404
          response.message = "No url found"
        }
    } catch (e) {
      response.status = 500
      response.error = e
    }
    return response;  // return response to router
  }
  
  // function for create new url
  public createUrl = async (request: any): Promise<any> => {
    const response: any = {status: 200}
    try {
      const validate = await UrlsValidations.urlValidation(request)  // validate request params
      let alreadyExist = await Urls.findOne({originalUrl: validate.originalUrl})  // check already exists with same url
      if(alreadyExist && alreadyExist._id) {
        response.data = alreadyExist
        response.message = "Url already exists"  // return response if already exists
      } else {
        let urlCode = shortId.generate();
        let shortUrl = request.baseUrl + "/" + urlCode;
        const data : IUrlModel = new Urls({
          originalUrl: validate.originalUrl,
          shortUrl,
          code: urlCode
        }); // create object for urls
        let urlData = await data.save();  // save the data
        response.data = urlData
      }
    } catch (e) {
      response.status = 500
      response.error = e
    }
    return response;  // return response
  }

}


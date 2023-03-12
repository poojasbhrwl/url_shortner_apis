import Joi from "joi"

class UrlsValidation {
    public urlValidation = (body: object) : Promise<any> => {
        const schema = Joi.object().keys({
            originalUrl: Joi.string().uri().required().label('Long Url'),
            baseUrl: Joi.string().required().label('Base Url')
        })
        return schema.validateAsync(body)
    }
}
export const UrlsValidations = new UrlsValidation()
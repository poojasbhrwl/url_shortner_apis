import Joi from "joi"

class UsersValidation {
    public registerUsersValidation = (body: object) : Promise<any> => {
        const schema = Joi.object().keys({
            name: Joi.string().required().label('Name'),
            email: Joi.string().email().required().label('Email'),
            password: Joi.string().required().label('Password')
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
            .messages({"string.pattern.base":"Minimum eight characters, at least one letter, one number and one special character required"}),
            role: Joi.string().required().label('Role')
        })
        return schema.validateAsync(body)
    }

    public loginValidation = (body: object) : Promise<any> => {
        const schema = Joi.object().keys({
            email: Joi.string().optional().label('Email'),
            password: Joi.string().required().label('Password')
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
            .messages({"string.pattern.base":"Minimum eight characters, at least one letter, one number and one special character required"}),
        })
        return schema.validateAsync(body)
    }
}
export const usersValidation = new UsersValidation()
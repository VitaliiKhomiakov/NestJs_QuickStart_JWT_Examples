import * as Joi from '@hapi/joi';

export const signUpSchema = Joi.object().keys({
  firstName: Joi.string().min(2).required(),
  middleName: Joi.string().min(2).optional().allow(''),
  lastName: Joi.string().min(2).required(),
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  password: Joi.string()
    .regex(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/))
    .required()
    .error(() => Error('Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, ' +
      'one number and one special character')),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required()
    .error(() => Error('Passwords must match')),
  phone: Joi.string().min(10).max(15).optional().allow(''),
  email: Joi.string().email().required()
});

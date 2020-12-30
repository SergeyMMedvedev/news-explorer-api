const { Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateObjId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Неверный id');
    }),
  }),
});

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'any.required': 'поле keyword должно быть заполнено',
      }),
    title: Joi.string().required()
      .messages({
        'any.required': 'поле title должно быть заполнено',
      }),
    text: Joi.string().required()
      .messages({
        'any.required': 'поле text должно быть заполнено',
      }),
    date: Joi.string().required()
      .messages({
        'any.required': 'поле date должно быть заполнено',
      }),
    source: Joi.string().required()
      .messages({
        'any.required': 'поле source должно быть заполнено',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(`${value} не валидная ссылка на статью!`);
    })
      .messages({
        'any.required': 'поле link должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(`${value} не валидная ссылка на иллюстрацию к статье!`);
    })
      .messages({
        'any.required': 'поле image должно быть заполнено',
      }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Неправильный формат почты!')
      .messages({
        'any.required': 'поле email должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'поле password должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30).trim()
      .required()
      .messages({
        'string.min': 'поле name должно включать минимум два символа',
        'string.max': 'поле name должно включать не более 30 символов',
        'any.required': 'поле name должно быть заполнено',
      }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Неправильный формат почты!')
      .messages({
        'any.required': 'поле email должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'поле password должно быть заполнено',
      }),
  }),
});

module.exports = {
  validateObjId,
  validateArticleBody,
  validateUserBody,
  validateAuthentication,
};

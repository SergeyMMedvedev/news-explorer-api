const incorrectId = 'Неверный id';
const requireAllFields = 'все поля должны быть заполнены';
const requireEmaillPassword = 'email и password должны быть заполнены';
const requireEmaillPasswordName = 'email, password и name должны быть заполнены';
const userNotOwner = 'Вы не являетесь автором статьи';
const articleNotFound = 'Нет статьи с таким id';
const userAlreadyExist = 'Пользователь с таким email уже существует';
const userNotFound = 'Нет пользователя с таким id';
const userNotAuth = 'Необходима авторизация';
const userWasDeleted = 'Пользователь был удален, необходимо зарегистрироваться заново';
const serverErrorMessage = 'Ошибка на сервере';
const incorrectEmailOrPassword = 'Неправильные почта или пароль';
const notFound = 'Запрашиваемый ресурс не найден';
const articleCreated = 'Статья успешно создана!';
const userCreated = 'Пользователь успешно создан!';

module.exports = {
  incorrectId,
  requireAllFields,
  requireEmaillPassword,
  requireEmaillPasswordName,
  userNotOwner,
  articleNotFound,
  userAlreadyExist,
  userNotFound,
  userNotAuth,
  userWasDeleted,
  serverErrorMessage,
  incorrectEmailOrPassword,
  notFound,
  articleCreated,
  userCreated,
};

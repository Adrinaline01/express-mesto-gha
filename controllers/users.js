const User = require('../models/user');

const ERROR_BAD_REQ = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_BAD_REQ).send({ message: 'Неверные данные пользователя' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере что-то сломалось' });
      }
    });
};

const getUsers = (res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(ERROR_SERVER).send({ message: 'На сервере что-то сломалось' });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'На сервере нет данного пользователя' });
        return;
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQ).send({ message: 'Неверные данные пользователя' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере что-то сломалось' });
      }
    });
};

const updateProfileUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'На сервере нет данного пользователя' });
        return;
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_BAD_REQ).send({ message: 'Неверные данные обновления профиля' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере что-то сломалось' });
      }
    });
};

const updateAvatarUser = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'На сервере нет данного пользователя' });
        return;
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_BAD_REQ).send({ message: 'Неверные данные обновления аватара' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере что-то сломалось' });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateProfileUser,
  updateAvatarUser,
};

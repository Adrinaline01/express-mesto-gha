const Card = require('../models/card');

const ERROR_BAD_REQ = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;
const CREATED = 201;

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_BAD_REQ).send({ message: 'Неверные данные при создании карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере что-то сломалось' });
      }
    });
};

const getCards = (res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(ERROR_SERVER).send({ message: 'На сервере что-то сломалось' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'На сервере нет этой карточки' });
        return;
      } else if (card.owner.toString() !== req.user._id) {
        res.status(ERROR_NOT_FOUND).send({ message: 'На сервере нет этой карточки' });
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQ).send({ message: 'Неверные данные карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере что-то сломалось' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'На сервере нет этой карточки' });
        return;
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQ).send({ message: 'Неверные данные карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере что-то сломалось' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'На сервере нет этой карточки' });
        return;
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQ).send({ message: 'Неверные данные карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере что-то сломалось' });
      }
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};

const Words = require('../models/word');
const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

module.exports.getMyWordCollection = async (req, res, next) => {
  try {
    const Word = await Words.find({ owner: req.user._id });
    res.status(200).send(Word);
  } catch (err) {
    next(err);
  }
};

module.exports.createWordCollection = async (req, res, next) => {
  const owner = req.user._id;
  const {
    name, word: [...word],
  } = req.body;
  try {
    const film = await Words({
      owner, name, word: [...word],
    }).save();
    res.status(200).send(film);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.deleteWordCollection = async (req, res, next) => {
  const Id = req.params.wordId;
  try {
    const WordId = await Words.findById(Id);
    if (WordId) {
      if (req.user._id === WordId.owner._id.toString()) {
        await Words.findByIdAndRemove(WordId, {
          new: true,
          runValidators: true,
        });
        res.status(200).send({ WordId });
      } else {
        throw new ForbiddenError('Недостаточно прав');
      }
    } else {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.deleteWord = async (req, res, next) => {
  const Id = req.params.wordsId;
  const WId = req.params.wordId;
  try {
    const WordId = await Words.findById(Id);
    const WordR = await WordId.updateOne({ $pull: { "word": { "_id" : WId }} });
    res.status(200).send({ WordR });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.pushWord = async (req, res, next) => {
  const Id = req.params.wordId;
  const { wordEn, wordRu } = req.body;
  try {
    const WordId = await Words.findById(Id).updateOne({ $push: { "word": { wordEn, wordRu}}});
    res.status(200).send({ WordId });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

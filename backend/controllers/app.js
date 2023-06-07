const bcrypt = require('bcryptjs');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BadRequestError } = require('../errors/BadRequestError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { ConflictError } = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUsers = async (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const users = await User({
      email, password: hashedPassword, name,
    }).save();
    res.status(200).send({
      email: users.email,
      name: users.name,
    });
    fs.mkdir(`./usersfile/${users._id}`, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Folder ${email} created successfully`);
      }
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    }
    if (err.name === 'MongoServerError') {
      next(new ConflictError('Пользователь с таким электнонным адресом уже зарегистрирован'));
    } else {
      next(err);
    }
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const users = await User.findOne({ email }).select('+password');
    if (!users) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const match = await bcrypt.compare(password, users.password);
    if (!match) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const token = jwt.sign({ _id: users._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
    res.status(200).cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true }).send({
      token,
      email: users.email,
      name: users.name,
    });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.clearCookie = async (req, res, next) => {
  try {
    res.status(200).clearCookie('jwt').send({ message: 'Вы успешно вышли' });
  } catch (err) {
    next(err);
  }
};

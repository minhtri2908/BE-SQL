import jwt from 'jsonwebtoken';
import { createError } from './error.js';
import UsersSchema from '../models/User.js';

export const verifyToken = (req, res, next, callback = null) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(
      createError(401, 'You are not authenticated!')
    );
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    const user = await UsersSchema.findOne({ id: payload.id });
    if (user === null) {
        return next(createError(422, 'User signed has been deleted or disabled!'));
    }
    req.user = user;
    if (callback) {
        callback();
    } else {
        next();
    }
  });
};

//but you must first loggin and than
export const verifyUser = (req, res, next) => {
    
  verifyToken(req, res, next, () => {
    console.log(req.params.id);
    console.log(req.user.id );
    console.log(req.user.isAdmin);
    if (req.user.id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      next(createError(403, 'You are not authorized!'));
    }
  });
};

export const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(createError(403, 'You are not authorized!'));
  }
  next();
};

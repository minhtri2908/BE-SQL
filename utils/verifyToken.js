import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) {
        return next(createError(401, 'You are not authenticated! ' + req.protocol + '://' + req.get('host') + req.originalUrl))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(createError(403, 'Token is not valid!'));
        req.user = user; 
        next();
    });
};

//but you must first loggin and than
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            //send error
            return next(createError(403, 'You are not authorized!'));
        }
    });
}


export const isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(createError(403, 'You are not authorized!'));
    }
    next();
}

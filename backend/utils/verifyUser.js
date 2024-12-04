import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers['authorization']?.split(' ')[1];
  console.log('Received Token:', token); // Log the token
  if (!token) {
    return next(errorHandler(401, 'Unauthorized - No token provided'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token Verification Failed:', err.message); // Log verification errors
      return next(errorHandler(401, 'Unauthorized - Invalid token'));
    }
    req.user = user;
    next();
  });
};


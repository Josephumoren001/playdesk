import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token || req.headers['authorization']?.split(' ')[1];
//   if (!token) {
//     return next(errorHandler(401, 'Unauthorized - No token provided'));
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return next(errorHandler(401, 'Unauthorized - Invalid token'));
//     }
//     req.user = user;
//     next();
//   });
// };


export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token || req.headers['authorization']?.split(' ')[1];
    console.log('Token received:', token);

    if (!token) {
      return next(errorHandler(401, "Unauthorized - No token provided"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('Token verification error:', err.message);
        return next(errorHandler(401, "Unauthorized - Invalid token"));
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Token verification error:", error);
    next(errorHandler(500, "An error occurred during token verification"));
  }
};


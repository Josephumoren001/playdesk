
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers['authorization']?.split(' ')[1];
  console.log('Token received:', token);

  if (!token) {
    console.log('No token provided');
    return next(errorHandler(401, 'Unauthorized - No token provided'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification error:', err.message);
      return next(errorHandler(401, 'Unauthorized - Invalid token'));
    }
    req.user = user;
    next();
  });
};




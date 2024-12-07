import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Sign-in function
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set!");
      return next(errorHandler(500, "Internal Server Error"));
    } else {
      console.log("JWT_SECRET is set:", process.env.JWT_SECRET); // Log the secret
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: validUser._id, email: validUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log('Generated Token:', token); // Log the token

    const { password: pass, ...rest } = validUser._doc;

    res.clearCookie("access_token");

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        path: "/", 
      })
      .json({
        success: true,
        user: rest,
        token // Include token in the response for frontend use
      });
  } catch (error) {
    console.error("Signin error:", error);
    next(errorHandler(500, "An error occurred during sign in"));
  }
};

// Sign-out function
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "User has been signed out successfully",
    });
  } catch (error) {
    console.error("Signout error:", error);
    next(errorHandler(500, "An error occurred during sign out"));
  }
};

// Verify token middleware
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

// Sign-up function
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "User already exists"));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    next(errorHandler(500, "An error occurred during sign up"));
  }
};

// Google OAuth function
// Google OAuth function
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          user: rest, // Include user in response
          token // Include token in the response for frontend use
        });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000,
          path: '/', 
        })
        .json({
          user: rest, // Include user in response
          token // Include token in the response for frontend use
        });
    }
  } catch (error) {
    next(error);
  }
};


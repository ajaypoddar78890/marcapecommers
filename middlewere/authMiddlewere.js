import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

// middleware for protected routes

export const checkPoint = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin routes

export const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        massage: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // //validations
    // if (!name) {
    //   return res.send({ error: "Name is Required" });
    // }
    // if (!email) {
    //   return res.send({ message: "Email is Required" });
    // }
    // if (!password) {
    //   return res.send({ message: "Password is Required" });
    // }
    // if (!phone) {
    //   return res.send({ message: "Phone no is Required" });
    // }
    // if (!address) {
    //   return res.send({ message: "Address is Required" });
    // }

    //checking user

    const existingUser = await userModel.findOne({ email });

    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        massage: "already register !! please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //saving to the db
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
    });
  }
};

//post LOGIN

export const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        massage: "invalid email or password",
      });
    }

    //checking user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        massage: "Email is not registered",
      });
    }

    //checking password

    const matchingPassword = await comparePassword(password, user.password);
    if (!matchingPassword) {
      return res.status(200).send({
        success: false,
        massage: "Invalid password",
      });
    }

    //Token

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      massage: "login succesfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      massage: "Got Error in LOGIN",
      error,
    });
  }
};

//test controlar

export const testControler = (req, res) => {
  res.send("protected routes");
};

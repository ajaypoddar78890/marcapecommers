import express from "express";
import {
  logincontroller,
  registerController,
  testControler,
} from "../controlers/authControllar.js";

import { checkPoint, isAdmin } from "../middlewere/authMiddlewere.js";

// router object

const router = express.Router();

// routing
//register controler  || method

router.post("/register", registerController);

// login

router.post("/login", logincontroller);

//test rout
router.get("/test", checkPoint, isAdmin, testControler);

//private routes for user's

router.get("/user-auth", checkPoint, (req, res) => {
  res.status(200).send({ ok: true });
});
// for Admin
router.get("/admin-auth", checkPoint, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;

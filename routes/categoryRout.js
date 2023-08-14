import express from "express";
import {
  CategoryController,
  CreateCategoryControler,
  deleteCategoryController,
  singlecategorycontroler,
  UpdateCategoryController,
} from "../controlers/categoryControler.js";

import { checkPoint } from "../middlewere/authMiddlewere.js";

const Router = express.Router();

// routes

// creat category rout

Router.post("/creat-category", checkPoint, CreateCategoryControler);

// update category route
Router.put("/update-category/:id", checkPoint, UpdateCategoryController);

// get category route
Router.get("/get-category", CategoryController);

// get single category route

Router.get("/get-category/:slug", singlecategorycontroler);

//delete category

Router.delete("/delete-category/:id", checkPoint, deleteCategoryController);

export default Router;

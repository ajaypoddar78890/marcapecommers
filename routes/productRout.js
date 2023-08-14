import express from "express";
import {
  creatProductcontroll,
  deleteproductsController,
  filterbyProduct,
  getproductController,
  productCategoryController,
  productCountController,
  productListController,
  productPhotoController,
  searchProductController,
  singleproductcontroller,
  updateProductcontroll,
} from "../controlers/productControler.js";
import formidable from "express-formidable";
import { checkPoint } from "../middlewere/authMiddlewere.js";
const Router = express.Router();

//routes
Router.post("/create-product", checkPoint, formidable(), creatProductcontroll);

//update product
Router.put(
  "/update-product/:pid",
  checkPoint,
  formidable(),
  updateProductcontroll
);

//all products

Router.get("/get-product", getproductController);

//deleting the products

Router.delete("/delete-product/:pid", checkPoint, deleteproductsController);

// get single product
// in case does't work use checkpoin to check authentication
Router.get("/get-product/:slug", singleproductcontroller);

//get photo of the product

Router.get("/product-photo/:pid", productPhotoController);

// filtering the  product
Router.post("/filter-product", filterbyProduct);

// getting product count

Router.get("/product-count", productCountController);

// getting pages list

Router.get("/product-list/:page", productListController);

//search product
Router.get("/search/:keyword", searchProductController);

Router.get("/product-category/:slug", productCategoryController);

export default Router;

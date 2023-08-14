import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const CreateCategoryControler = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    // checking existing category in the data base

    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(200).send({
        succes: true,
        message: "category already exist",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      succes: true,
      message: "new category creat",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      error,
      message: "Error in category",
    });
  }
};

//update category controller
export const UpdateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      succes: true,
      message: "category updated",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      error,
    });
  }
};

// cateogry controller to get all the category

export const CategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      succes: true,
      message: "all category are here",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "got error while getting all category",
    });
  }
};

//  getting single category

export const singlecategorycontroler = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      succes: true,
      message: "got single category succesfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      succes: false,
      error,
      message: "Error while getting single category",
    });
  }
};

// delete cateogry

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      succes: true,
      message: "category deleted succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      succes: false,
      message: "getting trouble to delete the category",
    });
  }
};

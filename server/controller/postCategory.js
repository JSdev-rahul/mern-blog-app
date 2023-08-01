const bcrypt = require("bcryptjs");
const PostCategory = require("../models/postCategory.js");

const postCategoryctrl = {
  getAllCategory: async (req, res) => {
    try {
      const result = await PostCategory.find({}).select("name _id")

      // Check if any categories were found
      if (result.length === 0) {
        return res.status(404).json({ message: "No categories found." });
      }

      // Send the response with the categories
      res.status(200).json(result);
    } catch (error) {
      // Handle any errors that occurred during the database query
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  },
  createNewcategory: async (req, res) => {
    try {
      const { name, description } = req.body;

      // Check if the required fields are provided
      if (!name || !description) {
        return res
          .status(400)
          .json({ error: "Name and description are required." });
      }

      // Check if the category name already exists
      const existingCategory = await PostCategory.findOne({ name });
      if (existingCategory) {
        return res.status(409).json({ error: "Category name already exists." });
      }

      // Create the new category
      const newCategory = await PostCategory.create({ name, description });

      // Send the response
      res.status(201).json(newCategory);
    } catch (error) {
      // Handle any errors that occurred during category creation
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  },
};

module.exports = postCategoryctrl;

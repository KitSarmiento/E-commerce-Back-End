const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
// see the activity 13-11 RESTful - Routes as a reference

// find all categories
// be sure to include its associated Products
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
// Used findbyPk to look up a category by its `id` value
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
//create expression is used to create a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its `id` value
//update expression is used to update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updateCategory[0]) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
//destroy expression is used to delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id },
    });

    if (!deleteCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

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
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedCategory[0]) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;

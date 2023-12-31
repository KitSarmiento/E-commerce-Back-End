const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json({ message: "Tag created successfully!", newTag });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.findByPk(req.params.id);
    if (!updatedTag) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    await updatedTag.update(req.body);
    res.status(200).json({ message: "Tag updated successfully!", updatedTag });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.findByPk(req.params.id);
    if (!deletedTag) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    await deletedTag.destroy();
    res.status(200).json({ message: "Tag deleted successfully!", deletedTag });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint

router.get('/', async (req, res) => {
// find all categories
// be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
// find one category by its `id` value
// be sure to include its associated Products 
  try {
    const singleCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!singleCategoryData) {
      res.status(404).json({ message: 'No Category with that id!' });
      return;
    }
    res.status(200).json(singleCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});


router.put('/:id', (req, res) => {
  // Update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then((updatedRowsCount) => {
      if (updatedRowsCount[0] === 0) {
        res.status(404).json({ message: 'No Category with that id!' });
        return;
      }
      res.status(200).json({ message: 'Category updated successfully!' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete('/:id', async (req, res) => {
// delete a category by its `id` value
  try {
    const deletedRowsCount = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ message: 'No Category with that id!' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
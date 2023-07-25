const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint

router.get('/', (req, res) => {
// find all tags
// be sure to include its associated Product data
  Tag.findAll({
    include: [{ model: Product }]
  })
    .then(tagsData => {
      res.status(200).json(tagsData);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


router.get('/:id', async (req, res) => {
// find a single tag by its `id`
// be sure to include its associated Product data
  try {
    const singleTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!singleTagData) {
      res.status(404).json({ message: 'No tag with that id!' });
      return;
    }
    res.status(200).json(singleTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => {
    res.status(200).json(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});


router.put('/:id', (req, res) => {
  // Update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then((updatedRowsCount) => {
      if (updatedRowsCount[0] === 0) {
        res.status(404).json({ message: 'No tag with that id!' });
        return;
      }
      res.status(200).json({ message: 'Tag updated successfully!' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete('/:id', async (req, res) => {
// delete on tag by its `id` value
  try {
    const deletedRowsCount = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ message: 'No tag with that id!' });
      return;
    }
    res.status(200).json({ message: 'Tag deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
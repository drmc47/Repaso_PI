const { Page, Category } = require('../models');
const router = require('express').Router();

router.get('/', async function(_req, res) {
  
  const categories = await Category.findAll();
  res.json(categories);

});

router.get('/:idCategory', async function(req, res) {
  

  const {idCategory} = req.params;

  const category = await Category.findByPk(idCategory, {
    include: Page
  })
  category ? res.json(category) : res.sendStatus(404);
  
});

module.exports = router;

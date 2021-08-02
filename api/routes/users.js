const { Page, User } = require('../models');
const router = require('express').Router();

router.get('/', async function(_req, res){
  try {
    const users = await User.findAll();
    res.json(users);
      
  } catch (error) {
      console.log(error);
  }

});

router.get('/:id', async function(req, res){
  const {id} = req.params;
  try {
      const user = await User.findByPk(id, {
        include: Page
      })
      return user ? res.json(user) : res.sendStatus(404)
      
  } catch (error) {
      console.log(error)
      
  }
});

module.exports = router;

const router = require('express').Router();
const { Page, User } = require('../models');

router.get('/', async(_req, res, next) => {
try {
    const pages = await Page.findAll();
    res.json(pages)
} catch (error) {
    next(error)
    
}
})
router.post('/', async function(req, res) {
   const {title, content, authorEmail, authorName, categories} = req.body;

  const userCreated = await User.findOrCreate({
    where: {
      name: authorName, 
      email: authorEmail
    }
  });

  const pageCreated = await Page.create({
    title: title,
    content: content
  });

  await userCreated[0].addPage(pageCreated);
  await pageCreated.setCategories(categories);
  res.json(pageCreated)

});


router.get('/:urlTitle', function(req, res) {

  const {urlTitle} = req.params;
  Page.findOne({
    where: {
      urlTitle: urlTitle
    }
  }).then((page) => {
    if(!page) return res.sendStatus(404)
    res.json(page)
  })
  


});

module.exports = router;

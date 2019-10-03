const { Router } = require('express');

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.status(200).json({
    title: 'Welcome to an E-commerce- API',
    documentation: 'Check it out at .....COMING SOON...',
    author: "Olamide Samuel",
    git_hub : "gold-olar"
  });
});

module.exports = router;

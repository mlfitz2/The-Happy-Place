const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Render the home feed page for all users whether logged in or not
router.get('/', async (req, res) => {
   try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: [
            'name'
          ]
        }
      ],
      where: {
        public: true
      },
      order: [
        ['created_at', 'DESC']
      ],
      limit: 5
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).json(posts);
    // render('homepage', {
    //   posts,
    //   // Pass the logged in flag to the template
    //   logged_in: req.session.logged_in,
    //   username: req.session.username
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

// URL variable routes must be defined after specific routes of the samel HTTP method to avoid a specific route being treated as a URL modified one
// Render the home feed with a page number for pagination for all users whether logged in or not
router.get('/:page', async (req, res) => {
    const limitPerPage = 5;

   try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: [
            'name'
          ]
        }
      ],
      where: {
        public: true
      },
      order: [
        ['created_at', 'DESC']
      ],
      offset: (req.params.page - 1) * limitPerPage,
      limit: limitPerPage
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).json(posts);
    // render('homepage', {
    //   posts,
    //   // Pass the logged in flag to the template
    //   logged_in: req.session.logged_in,
    //   username: req.session.username
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
});



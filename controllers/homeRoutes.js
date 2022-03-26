const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Render the home feed page for all users whether logged in or not
router.get('/:page', async (req, res) => {
    let postNumber = 0;
    if(req.params.page) {
        postNumber = req.params.page * 20;
    }
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
      offset: postNumber,
      limit: 20
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
      username: req.session.username
    });
  } catch (err) {
    res.status(500).json(err);
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

const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../../utils/auth');
const { dayStart, dayEnd } = require('../../utils/dates');

// Pull back all public posts for a specific date
router.get('/:date', async (req, res) => {
    const startDate = dayStart(req.params.date);
    const endDate = dayEnd(req.params.date);
   
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
        public: true,
        created_at: {
            [Op.between]: [startDate, endDate]
        }
      },
      order: [
        ['created_at', 'DESC']
      ],
      limit: 10
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).json(posts);
    // render('enterpagename', {
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

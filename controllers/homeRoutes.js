const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');
const { startOfToday, endOfToday, startOfDay, endOfDay, getUnixTime, fromUnixTime } = require('date-fns');
const { zonedTimeToUtc } = require('date-fns-tz');
const { daySimple } = require('../utils/dates');
const { Op } = require('sequelize');

// Render the home feed page for all users whether logged in or not
// homepage defaults to today
router.get('/', async (req, res) => {

  // set TZ, pull start and end date of today. Dates will default to TZ of server
  const startDate = startOfToday();
  const endDate = endOfToday();

  // convert to local time PST
  const timeZone = 'America/Los_Angeles';
  const utcStart = zonedTimeToUtc(startDate, timeZone)

  // convert to simple string for render to client and unix timestamp for view-by-date functionality
  const todayString = daySimple(JSON.stringify(startDate));
  const todayUnix = getUnixTime(utcStart);

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
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).render('homepage', {
      posts,
      today: todayString,
      todayUnix,
      utcStart,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
      username: req.session.username
    });
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


// Adjust the homepage feed based on date selected
router.get('/:date', async (req, res) => {

  const date = fromUnixTime(req.params.date);
  const today = startOfToday();
  const startDate = startOfDay(date);
  const endDate = endOfDay(date);
  const dayString = daySimple(JSON.stringify(startDate));
  const dayUnix = getUnixTime(startDate);

  if (JSON.stringify(startDate) === JSON.stringify(today)) {
    res.redirect('/');
    return
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
          public: true,
          created_at: {
            [Op.between]: [startDate, endDate]
        }
      },
      order: [
        ['created_at', 'DESC']
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).render('archive', {
      posts,
      day: dayString,
      dayUnix,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
      username: req.session.username
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
});

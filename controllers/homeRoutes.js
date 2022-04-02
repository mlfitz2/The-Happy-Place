const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');
const { startOfToday, endOfToday, startOfDay, endOfDay, getUnixTime, fromUnixTime } = require('date-fns');
const { daySimple } = require('../utils/dates');
const { Op } = require('sequelize');

// Render the home feed page for all users whether logged in or not
// homepage defaults to today
router.get('/', async (req, res) => {

  // pull in start and end date for today. Will default to pacfici start time in GMT, but be converted correctly becasuse of timezone offset in connection.js file
  const startDate = startOfToday();
  const endDate = endOfToday();

  // convert to simple date string to render to page and unix timestamp to populate hyperlinks correctly to previous day pages
  const todayString = daySimple(JSON.stringify(startDate));
  const todayUnix = getUnixTime(startDate);

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

// Same as home route, but only displays the public and private posts of the logged in user.
router.get('/private', withAuth, async (req, res) => {

  const loggedInUser = req.session.user_id;
  const private = true;

  // pull in start and end date for today. Will default to pacfiic start time in GMT, but be converted correctly becasuse of timezone offset in connection.js file
  const startDate = startOfToday();
  const endDate = endOfToday();

  // convert to simple date string to render to page and unix timestamp to populate hyperlinks correctly to previous day pages
  const todayString = daySimple(JSON.stringify(startDate));
  const todayUnix = getUnixTime(startDate);

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
          user_id: loggedInUser,
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
      private,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
      username: req.session.username
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
});


// Adjust the homepage feed based on date selected
router.get('/:date', async (req, res) => {

  // convert the unix date from the URL to a date
  const date = fromUnixTime(req.params.date);
  
  // get the start and end time of that date to use in the database call as the BETWEEN parameters for post.createdAt
  const startDate = startOfDay(date);
  const endDate = endOfDay(date);

  // convert date to readable string for page rendering and unix stamp for hyperlink usage
  const dayString = daySimple(JSON.stringify(startDate));
  const dayUnix = getUnixTime(startDate);

  // pull in today's date
  const today = startOfToday();

  // if the URL matches today's date - redirect to the home page
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

// Adjust the homepage feed based on date selected
router.get('/:date/private', withAuth, async (req, res) => {

  const loggedInUser = req.session.user_id;
  const private = true;

  // convert the unix date from the URL to a date
  const date = fromUnixTime(req.params.date);
  
  // get the start and end time of that date to use in the database call as the BETWEEN parameters for post.createdAt
  const startDate = startOfDay(date);
  const endDate = endOfDay(date);

  // convert date to readable string for page rendering and unix stamp for hyperlink usage
  const dayString = daySimple(JSON.stringify(startDate));
  const dayUnix = getUnixTime(startDate);

  // pull in today's date
  const today = startOfToday();

  // if the URL matches today's date - redirect to the home page
  if (JSON.stringify(startDate) === JSON.stringify(today)) {
    res.redirect('/private');
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
          user_id: loggedInUser,
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
      private,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
      username: req.session.username
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
});

module.exports = router;
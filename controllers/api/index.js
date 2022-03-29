const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const profileRoutes = require('./profileRoutes');
const calendarRoutes = require('./calendarRoutes');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/profile', profileRoutes);
router.use('/calendar', calendarRoutes);

module.exports = router;

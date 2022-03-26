const router = require('express').Router();
const { request } = require('express');
const { User, Post } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/:user', async (req, res) => {
    try {

        let data =  {
            model: Post, 
            where: { public: true }
        }

        if ( req.params.user.toLowerCase() === req.session.username.toLowerCase()) {
            //Below: for testing purposes
            // if ( req.params.user.toLowerCase() === 'john') {
            data = {
                model: Post
            }
        }

        const userData = await User.findOne({ where: { name: req.params.user }, 
            include: [
                data
            ] 
        });

        if (!userData) {
            res.status(400).json({ message: 'No such user exists.'});
            return;
        }
        const user = userData.get({ plain: true });
        
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `${error}` });
    }
});

module.exports = router;
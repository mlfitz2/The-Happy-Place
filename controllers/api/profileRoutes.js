const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
    res.redirect(`/api/profile/${req.session.username}`);
}); 


router.get('/:user', withAuth, async (req, res) => {
    try {
        let ownProfile = false;
        let data =  {
            model: Post, 
            where: { public: true },
            as: 'posts'
        }

        if (req.session.username) {
            if (req.params.user.toLowerCase() === req.session.username.toLowerCase()) {
        //Below: for testing purposes
        // if ( req.params.user.toLowerCase() === 'sally') {
   
                data = {
                    model: Post,
                    as: 'posts'
                };
                ownProfile = true;
            }
        }

        const userData = await User.findOne({ where: { name: req.params.user }, 
            include: [
                data
            ],            
            order: [
                ['posts', 'createdAt', 'DESC']
            ]
        });

        if (!userData) {
            res.status(400).json({ message: 'No such user exists.'});
            return;
        }
        
        const user = await userData.get({ plain: true });
        
        if (ownProfile) {
            console.log(user);
            res.status(200).render('myprofile', {
                user,
                // Pass the logged in flag to the template
                logged_in: req.session.logged_in,
                username: req.session.username,
            });
        } else { 
            console.log(user);
            res.status(200).render('profile', {
                user,
                // Pass the logged in flag to the template
                logged_in: req.session.logged_in,
                username: req.session.username,
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `${error}` });
    }
});

// update an existing user record on email and bio
router.put('/:user', withAuth, async (req, res) => {
    try{
        const userData = await User.update(
            {
                email: req.body.email,
                bio: req.body.bio
            },
            {
                where: {
                    name: req.params.user
                }
            }
        );
        if(!userData[0]) {
            res.status(404).json({message: 'No user with this username exists.'});
            return;
          }
            res.status(200).json({ message: `User updated` });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `${error}`});
    }
});


module.exports = router;
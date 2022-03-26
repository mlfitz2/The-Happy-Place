const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// need to add in withAuth once setup to do so

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            public: req.body.public,
            user_id: 3//req.session.user_id
        });
        console.log(newPost);
        res.status(200).json({ message: `New post created`});
        // add in res.render for handlebars
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `${error}` });
      }
});

router.put('/:id', async (req, res) => {
    // update a post by its `id` value
    try{
        const postData = await Post.update(
            {
                title: req.body.content,
                content: req.body.content,
                public: req.body.public
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        if(!postData[0]) {
            res.status(404).json({message: 'No post with this id exists.'});
            return;
          }
            res.status(200).json({ message: `Post updated` });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `${error}`});
    }
});

router.delete('/:id', async (req, res) => {
    // delete a post by its `id` value
    try {
      const postData = await Post.destroy(
        {
          where: {
            id: req.params.id
          }
        }
      );
        if(!postData) {
          res.status(404).json({message: 'No post with this id exists.'});
          return;
        }
          res.status(200).json({ message: `Post deleted` });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: `${error}` });
        };
  });

module.exports = router;
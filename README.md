#                   Welcome to The Happy Place :)


![The Happy Place Readme Opening Imagery](https://www.livehappy.com/wp-content/uploads/2018/02/happy.jpg)



**The Happy Place :)** is an app that allows users to *journal daily on subjects that contribute to their wellbeing, and mental health.* Users can use this as a private diary, or share their posts publicly. 

**As social media has become an increasingly toxic environment driven by a need for instant gratification** our app will not be based on interaction or likes, and instead will focus on the *value of journaling positive experiences.*


Here we share our gratitude for the good times and the bad, the ups and the downs and all that fall in between.
You are welcome to join us to share in our thoughts, our struggles, our accomplishments, our goals, ourselves.
Feel free to make an account through the Login page found in the top right menu to partake in this journey we call life, together.



##                  Who is **The Happy Place :)** Made for Anyways?


![Typical social media](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOHV1tFEHL2CXOil4YM9ept8mnCQjUjScGA&usqp=CAU)

**AS A USER**

- When I login I am presented with a home screen showing the most recent public posts

- As a USER I can login using a username and password, or sign up to create an account

-Once logged in I can view all my public and private posts

- I can create new posts or edit older ones. Posts are set to either public or private

- I am able to view the public posts of other users by user

- I can toggle to a calendar view and view a count of public posts by day

- I can switch this view to only view a count of my own posts

- When I click on a date I can view posts associated with that date



###                  Technologies and Development:

**Built With:**

[MVC architecture](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

            We have utilized the Model-View-Controller paradigm. The MVC is a pattern in software design commonly used to implement user interfaces, data, and controlling logic. It emphasizes a separation between the software's business logic and display. This "separation of concerns" provides for a better division of labor and improved maintenance.`

[Node.js](https://nodejs.org/en/docs/)

        
            Through Node.js, Express.js, and Sequelize we are utilizing CRUD methodologies in the back-end development to CREATE, READ, UPDATE, AND DELETE data. 


[Express.js](https://expressjs.com/)

            Example CRUD code block:


                                ```
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
                                ```

[Sequelize](https://sequelize.org/)

        
           

[Handlebars.js](https://handlebarsjs.com/)

           
        





####                    Development Staff:




This project is developed by *groupFive*

**Front-end Development:**
    - Patric Seaman
    - Jon Burch

**Back-end Development:**
    - Ben Fok
    - Michael Fitzpatrick

**Utility:**
    - Daniel Klotz





#####                   Wanna Try?


![The Happy Place](https://images.squarespace-cdn.com/content/v1/5dc364e749035d18e6487b1a/1574125097244-WOT8UEGEORK43SWBQFQE/59244174_368886433968369_8260657057507697092_n.jpg?format=1000w)



Visit the GitHub repository at: 

[Link Text](https://github.com/mlfitz2/The-Happy-Place)


Try the deployed application for yourself at:

[Link Text](https://path/to/link)


Thanks for reading. Enjoy The Happy Place!





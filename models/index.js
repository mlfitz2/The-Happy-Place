const User = require('./User');
const Post = require('./Post');

// A User can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Posts belong to Users
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post };

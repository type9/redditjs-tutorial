const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (app) => {
  // CREATE Comment
  app.post("/posts/:postId/comments", function(req, res) {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);
    comment.author = req.user._id;

    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
      .save()
      .then(comment => {
        return Post.findById(req.params.postId);
      })
      .then(post => {
        post.comments.unshift(comment);
        return post.save();
      })
      .then(post => {
        res.redirect(`/`);
      })
      .catch(err => {
        console.log(err);
      });
  });
  // SHOW
  app.get("/posts/:id", function (req, res) {
    var currentUser = req.user;
    // LOOK UP THE POST

    Post.findById(req.params.id).populate({path:'comments', populate: {path: 'author'}}).populate('author')
        .then(post => {
            res.render("posts-show", { post, currentUser });  
        })
        .catch(err => {
            console.log(err.message);
        });
  });
};
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req,res)=>{
  try {
    const posts = await Post.find().populate('user','first_name last_name picture username gender text').populate("comments.commentBy", "first_name last_name picture username").sort({ createdAt: "desc" })
    res.json(posts)
  } catch (error) {
    console.log(error)
  }
}

exports.comment = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    console.log(postId)
    let newComments = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment: comment,
            commentBy: req.user.id,
          },
        },
      },
      {
        new: true,
      }
    ).populate("comments.commentBy", "picture first_name last_name username");
    res.json(newComments.comments);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getCommentByPost = async (req,res)=>{
  try {
    const { postId } = req.params
    const commentOfPost = await Post.findById(postId).populate("comments.commentBy", "picture first_name last_name username");
    if(!commentOfPost){
      return res.status(400).json({ message:'This postId is incorrect' });
    }
    res.status(200).json(commentOfPost.comments)
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
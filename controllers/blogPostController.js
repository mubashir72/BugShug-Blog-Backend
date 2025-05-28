const BlogPost = require('../model/BlogPost');

const createNewPost = async (req, res) => {
  const { title, content, tags, category, coverImage } = req.body;

  if (!title || !content || !tags || !category)
    return res
      .status(400)
      .json({ message: 'title, content,category, and tags are required' });

  const duplicate = await BlogPost.findOne({ title: title }).exec();
  if (duplicate) {
    return res.status(409).json({ message: `Title ${title} already existz` });
  }
  //add functionality to check if the person posting is admin or editor else return unauthorized
  try {
    const result = await BlogPost.create({
      title: title,
      content: content,
      tags: tags,
      category: category,
      //add author the person logged in
    });
    console.log(result);
    res.status(201).json({ success: 'Post created Succesfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updatePost = async (req, res) => {
  const { id, title, content, tags, category, coverImage } = req.body;
  if (!id) return res.status(400).json({ message: 'ID parameter required' });
  const post = await BlogPost.findOne({
    _id: id,
  }).exec();

  if (!post)
    return res.status(204).json({ message: `No post matches ID ${id}` });
  if (title) post.title = title;
  if (content) post.content = content;
  if (tags) post.tags = tags;
  if (category) post.category = category;
  if (coverImage) post.coverImage = coverImage;
  const result = await post.save();
  res.json(result);
};
const getAllPost = async (req, res) => {
  const posts = await BlogPost.find();
  if (!posts) return res.status(204).json({ message: 'No posts' });
  res.json(posts);
};
const getPost = async (req, res) => {
  const id = req.params;
  if (!id)
    return res.status(401).json({
      message: 'ID parameter required',
    });
  const post = await BlogPost.findOne({
    _id: id,
  }).exec();
  if (!post)
    return res.status(204).json({ message: `No post matches ID: ${ID}` });

  res.json(post);
};
const deletePost = async (req, res) => {};
module.exports = { getPost, getAllPost, createNewPost, updatePost, deletePost };

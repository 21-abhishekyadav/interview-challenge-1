const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const axios = require('axios').default;
const router = express.Router();


router.get('/', async (req, res) => {

  // to send params to function for proper loading of pages (req.query ) is sent as parameter
  const posts = await fetchPosts(req.query);


  // TODO use this route to fetch photos for each post
  // axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);

  // the task was completed using a for loop instead of reduce statement as we can't use await for api call in reduce 
  // creating an array postWithImages and pushing post and image data in it inside the loop and sending the array as response 


  const postsWithImages = [];
  for (const post of posts){
  const image= await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
  const user= await fetchUserById(post.userId);

  const postWithImages = {
    ...post,
    images : image.data,
    user : user,
   
  };
postsWithImages.push(postWithImages);
  }


  res.json(postsWithImages);
});

module.exports = router;

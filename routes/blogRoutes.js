const express = require('express');

//importing the blog model from blog
const Blog = require("../models/blog");

const router = express.Router();


router.get('/',(req, res) => {
    Blog.find().sort({CreatedAt: -1})
    .then((result) => {
        res.render('index',{title: 'All blogs', blogs: result});
    })
    .catch((err) => {
        console.log(err);
    })
    
})

router.post('/', (req, res) => {
  //console.log(req.body); 
  const blog = new Blog(req.body);

  blog.save()
  .then((result) => {
    res.redirect('/blogs');
  
  })
  .catch(((err) => {
    console.log(err);
  }))

})

router.get('/create', (req,res)=>{
    res.render('create', {title:'Create new blog'});
})

router.get('/:id',(req, res) => {
  Blog.findById(req.params.id)
  .then((result => {
    res.render('details', { blog: result, title:'Blog Details'});
  }))
  .catch((err => {
    console.log(err);
  }))
})

router.delete('/:id',(req, res) => {
  Blog.findByIdAndDelete(req.params.id)
  .then((result) => {
    res.json({redirect: '/blogs'});
  })
  .catch(err => {
    console.log(err);
  })

});


module.exports = router;
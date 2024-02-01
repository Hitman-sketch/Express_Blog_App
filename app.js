const express = require('express');

//express app
const app = express();




//morgan for middelware logging 
const morgan = require('morgan');

//mongoose app
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

const { result } = require('lodash');

// register view engine configuration
app.set('view engine','ejs')




//middelware  static files 
app.use(morgan('dev')); //logging middleware
app.use(express.static('public')); //public static
app.use(express.urlencoded({extended: true})); //It takes all the urlencoded data and passes it into an object.

//connecting to the database

const dburl = secret;//mongodb url key
mongoose.connect(dburl, {useNewUrlParser:true, useUnifiedTopology:true})
.then((result) => app.listen(3000))  //listening for requests
.catch((err) => console.log(err));


// //mongoose and mongo sandbox routes
// app.get('/add-blog',(req,res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'Lorem et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         body: 'Lorem ipsum dolor sit amet, consectet ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore '
//     });
//     blog.save()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

// app.get('/all-blogs', (req,res) =>{
//     Blog.find()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })

// })

// app.get('/single-blog', (req,res) =>{
//     Blog.findById('659ece770f622b763b5b7d76')
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })

// })


// app.use((req,res,next) => {
    // console.log('new request made');
    // console.log('host:', req.hostname);
    // console.log('path:', req.path);
    // console.log('method:', req.method);
    // next();

// });

//middleware and static files

//middleware and static files



//requesting the home page


//routes
app.get('/', (req, res) => {
    //res.send('<b>home page</b>');
    //res.sendFile('./views/index.ejs', {root : __dirname});
    res.redirect('/blogs');

});

app.get('/about', (req, res) => {
    //res.send('<b>about page</b>');
    //res.sendFile('./views/about.html', {root : __dirname});
    res.render('about', {title:'About'});
});

app.use('/blogs',blogRoutes);

//app.get('/about-us', (req, res) =>{
  //  res.redirect('/about');
//});

//this is a middleware that returns a 404
app.use((req,res) =>{
    res.status(404).render('404',{title:'404'});  
});

//mongoose is an ODM library - Object Document Mapping Library
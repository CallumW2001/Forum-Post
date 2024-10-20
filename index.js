import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var posts = [];

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());

app.get('/', (req,res) =>
{
    res.render('index.ejs');
})


app.get('/view', (req,res) =>
{
    res.render('view.ejs', {postsArray: posts});
})

app.get('/login', (req,res) => {
    res.render('login.ejs');
})

app.get('/register', (req,res) =>
{
    res.render('register.ejs');
})

app.post('/submit', (req, res) => {
    let post = req.body.submitBox;  
    posts.push(post); 
    res.redirect('/view');  
});

app.put('/update-post', (req, res) => {
    const { index, updatedPost } = req.body; 

    console.log('Received index:', index);  
    console.log('Received updatedPost:', updatedPost); 
   
    if (index >= 0 && index < posts.length) {
       
        posts[index] = updatedPost;

       
        res.json({ message: 'Post updated successfully', updatedPost });
    } else {
        
        res.status(400).json({ message: 'Invalid post index' });
    }
});

app.delete('/delete-post', (req, res) => {
    const { index } = req.body; 
    if (index >= 0 && index < posts.length) {
        posts.splice(index, 1); 
        res.json({ message: 'Post deleted successfully' });
    } else {
        res.status(400).json({ message: 'Invalid post index' });
    }
});




app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});



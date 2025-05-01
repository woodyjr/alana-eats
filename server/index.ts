import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let blogPosts: any[] = [];
let recipes: any[] = [];

app.get('/api/blog-posts', (req, res) => {
  res.json(blogPosts);
});

app.post('/api/blog-posts', (req, res) => {
  const newPost = req.body;
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

app.post('/api/recipes', (req, res) => {
  const newRecipe = req.body;
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Create web server
// - When user request to /comments, return list of comments
// - When user request to /add-comment, add new comment
// - When user request to /delete-comment, delete a comment
// - When user request to /update-comment, update a comment
// - When user request to /like-comment, increase a like of a comment
// - When user request to /dislike-comment, increase a dislike of a comment
// - When user request to /comments/:id, return a comment by id

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
    }
    res.send(JSON.parse(data));
  });
});

app.get('/comments/:id', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
    }
    const comments = JSON.parse(data);
    const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
    if (!comment) {
      res.status(404).send('Comment not found');
    }
    res.send(comment);
  });
});

app.post('/add-comment', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
    }
    const comments = JSON.parse(data);
    const newComment = {
      id: comments.length + 1,
      ...req.body,
      likes: 0,
      dislikes: 0,
    };
    comments.push(newComment);
    fs.writeFile('./data.json', JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Internal server error');
      }
      res.send('Comment added');
    });
  });
});

app.put('/update-comment', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
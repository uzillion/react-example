require('dotenv').config();
const express = require('express');
const bP = require('body-parser');
const cors = require('cors');
const db = require('./db');
app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bP.urlencoded({ extended: true }))
 
// parse application/json
app.use(bP.json())
 

const palindrome = (word) => {
  if(typeof(word) === 'string') {
    return word + word.split('').reverse().join('');
  }
}

app.get('/', (req, res) => {
  const word = req.query.word;
  console.log(word)
  res.json({palindrome: palindrome(word)})
})

app.get('/user', (req, res) => {
  db.all('SELECT * FROM users', (err, data) => {
    res.json(data);
  })
})

app.post('/user', (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  db.run(`INSERT INTO users (name, age) VALUES("${name}",${age})`, (err) => {
    if(err) {
      console.log("Failed to inser data", err);
      res.json(404)
    } else {
      console.log("Insertion successful");
      res.json(200)
    }
  })

})


app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on port ${process.env.PORT || 3001}...`)
})

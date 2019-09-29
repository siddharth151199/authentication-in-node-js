const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
// var bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = []


app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', async (req, res) =>{
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashPassword }
    console.log(hashPassword);
    console.log(hashPassword);
    console.log(user);
    users.push(user)
    res.status(201).send("inserted")
  } catch (e) {
res.status(505).send()
  }
});
app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name == req.body.name)
  console.log(user);
  if (user == null) {
    return res.status(400).send('cannot connect')
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('succes')
    }else {
      res.send('not find')
    }
  } catch (e) {
   res.status(500).send()
  }
});

app.listen(3000, ()=>{
  console.log('serverin runiig...');
})

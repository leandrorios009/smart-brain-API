const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
});


const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
	res.json('It is working');
})



// ----------  REGISTER  ----------
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// ----------  SIGNIN  ----------
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

// ----------  PROFILE  ----------
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

// ----------  IMAGE  ----------
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

// ----------  IMAGEURL  ----------
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })




// ----------  START  ----------
app.listen(process.env.PORT || 3000, () => {
	console.log(`app is runing on port ${process.env.PORT}`);
}); 
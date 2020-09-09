const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
//const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc/swagger.json');
const dotenv = require('dotenv');
//const { body, validationResult } = require('express-validator');
dotenv.config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.1dazt.mongodb.net/${process.env.MONGO_COLLECTION}?retryWrites=true&w=majority`;

const port = process.env.PORT || 3001;

const app = express();

//Mongoose connection

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("Connected with MongoDB");
});
/*
app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.post('/users', [
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 })
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  }).then(user => res.json(user));
});


app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/');

*/

app.use(bodyParser.json());

//Import Routes
const usersRoute = require('./routes/users');

app.use('/users', usersRoute);

//routes
app.post('/', (req, res) => {
  res.send('We are on home');
});


// Listening to the server
app.listen(port, () => {
    console.log(`Server is listening ${port}`);
})




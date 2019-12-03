require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');


const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

const MONGO_URI = 'mongodb+srv://admin:password529@cluster0-fntpb.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to Mongo instance. ', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email : ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listing on port 3000');
});

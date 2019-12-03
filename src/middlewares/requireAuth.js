const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization) {
    res.status(401).send({ error: 'You must be logged in.'})
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if(err) {
      console.log('Token is invalid.');
      res.status(401).send({ error: 'You must be logged in.'});
    }

    const { userId } = payload;
    const user = await User.findById(userId);
    if(user) {
      req.user = user;
      next();
    } else {
      console.log('User not found!');
      res.status(401).send({ error: 'You must be logged in.'});
    }
  })
};


module.exports = requireAuth;
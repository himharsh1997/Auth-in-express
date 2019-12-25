const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const environment = process.env.NODE_ENV;
const config = require('config');

// schema maps to a collection
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
          type : 'String',
          required: true,
          trim: true,
          unqiue: true
        },
  password: {
              type : 'String',
              required: true,
              trim: true
            }
})

// encrypt password before save
userSchema.pre('save', function(next) {
  const user = this;
  console.log(user);
  if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
    next();
  } else {
    bcrypt.hash(user.password, config.saltingRounds, function(err, hash) {
      if (err) {
        console.log('Error hashing password for user', user.name);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

module.exports = mongoose.model('users', userSchema);

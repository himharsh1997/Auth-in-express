const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const users = require('../models/users.model');

const connUrl  = 'mongodb://localhost:27017' || process.env.NODE_ENV.MONGO_LOCAL_CONN_URL;

module.exports = {
  add: (req, res) => {
    mongoose.connect(connUrl, { useNewUrlParser : true, useUnifiedTopology: true }, (err)=>{
      let status = 201;
      let result = {};
      if(!err){
       const name = req.body.name;
       const password = req.body.password;
       const users = new user({name, password});

      users.save((err, user) =>{
       if(err){
          status = 500;
          result.status = status;
          result.data = err;
       } else {
          result.status = status;
          result.data = user;
       }
       res.status(result.status).send(result);

      })
      } else{
        status = 500;
        result.status = status;
        result.data = err;
        res.status(result.status).send(result);
      }
    })
  },
  getAll: (req, res) => {
    mongoose.connect(connUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
      users.find({}, (err, users) => {
        if (!err) {
          res.send(users);
        } else {
          console.log('Error', err);
        }
      });
    });
  },
  login: (req, res) =>{
    mongoose.connect(connUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
      try {
        let result = {};
        let status = 201;
        const name = req.body.name;
        const password = req.body.password;
        if(!err){
          users.find({name}, (err, user) =>{
            try{
              if(!err && user){
              bcrypt.compare(password, user[0].password).then(match=>{
               if(match){
                status = 201;
                result.status = status;
                result.result = 'User login successfully';
               } else {
                status = 401;
                result.status = status;
                result.result = 'Password not match for given user';
               }
              res.status(status).send(result);
             }).catch((err) => {
              console.log(err);
              status = 500;
              result.status = status;
              result.result = err;
              res.status(status).send(result);
            });
              } else {
                status = 401;
                result.status = status;
                result.result = err;
              }
            }
            catch(err){
              status = 500;
              result.status = status;
              result.result = err;
              res.status(status).send(result);
            }
          })
        } else {
          status = 401;
          result.status = status;
          result.result = err;
          res.status(status).send(result);
        }
      } catch (err) {
         res.status(500).send(err);
      }
    });
  }
}

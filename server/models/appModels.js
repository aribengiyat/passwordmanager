const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const MONGO_URI = 'mongodb://127.0.0.1:27017/soloProject';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to Mongo'))
  .catch(err => console.log(err));


const Schema = mongoose.Schema;

//users db (deals with login functionality)

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  storedData: []
})

//this will salt the passwords anytime we add a new user to users
userSchema.pre("save", function (next) {
  const user = this;
  //check if we are changing pass
  if (!user.isModified('password')) return next();
  //hash the pass
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    //err handling
    if (err) return next(err);
    //overwrite plaintext pass with hash
    user.password = hash;
    return next();
  })
});


const User = mongoose.model('User', userSchema);



module.exports = {
  User
}



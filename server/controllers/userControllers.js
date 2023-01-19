const db = require('../models/appModels');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userController = {};

userController.addData = (req, res, next) => {
  console.log('adding data')
  db.User.create(req.body)
    .then((data) => {
      res.locals.added = data;
      return next();
    })
    .catch((error) => next({ log: error, status: 400, message: 'Problem with input sent to db. Check server logs for more info.' }));
}

userController.checkPass = async (req, res, next) => {
  try {
    console.log('checking data')
    console.log(req.body);
    const { username, password } = req.body;
    console.log('check pass password: ', password)
    const dbFound = await db.User.find({ 'username': username });
    console.log('found db', dbFound);
    const match = await bcrypt.compare(password, dbFound[0].password);
    console.log('crypted');
    res.locals.result = match;
    console.log('returning next, match is: ', match)
    return next();
  }
  catch (e) {
    return next({ log:'problem with checking pass ' + e, status: 400, message: 'Problem with input sent to db. Check server logs for more info.' })
  }
}

userController.isLoggedIn = (res, req, next) => {
  console.log('inside of login check', res.cookies.SSID)
  if (res.cookies.SSID) next();
  else return next('No cookie no honey');
}

module.exports = userController;
const db = require('../models/appModels');

const passwordController = {};

passwordController.addPassword = (req, res, next) => {
  console.log('adding pass')
  // const { website, username, password, userId } = req.body;
  const { SSID } = req.cookies;
  console.log(SSID);
  db.User.findOneAndUpdate({ username: SSID },
    { $push: { storedData: req.body } },
    {new: true}
  )
    .then((data) => {
      console.log(data);
      res.locals.addPass = data;
      return next();
    })
    .catch((error) => next({ log: error, status: 400, message: 'Problem adding to pwdb' }))
}

passwordController.getPasswords = (req, res, next) => {
  console.log('inside of getpasswords')
  let cookieName = req.cookies.SSID;
  console.log(cookieName)
  db.User.find({ 'username': cookieName })
    .then((data) => {
      console.log(data.storedData, data);
      res.locals.passwords = data[0].storedData;
      return next();
    })
    .catch((err) => next(err));
  
}

module.exports = passwordController;
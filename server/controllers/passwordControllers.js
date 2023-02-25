const db = require('../models/appModels');
const cryptoAES = require('crypto-js/aes');
const cryptoENC = require ('crypto-js/enc-utf8')

const passwordController = {};

passwordController.addPassword = (req, res, next) => {
  console.log('adding pass')
  // const { website, username, password, userId } = req.body;
  const { SSID } = req.cookies;
  const encrypt = cryptoAES.encrypt(req.body.password, SSID).toString();
  const addedPass = Object.assign({}, req.body, { password: encrypt });
  console.log(addedPass);
  db.User.findOneAndUpdate({ username: SSID },
    { $push: { storedData: addedPass } },
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
  console.log('Cookie name is: ', cookieName)
  db.User.find({ 'username': cookieName })
    .then((data) => {
      console.log('recieved data')
      console.log(data[0].storedData);
      for (const el of data[0].storedData) {
        console.log('looping', el)
        let encrypt = el.password;
        let decrypt = cryptoAES.decrypt(encrypt, cookieName).toString(cryptoENC);
        console.log(decrypt);
        el.password = decrypt
      }
      res.locals.passwords = data[0].storedData;
      return next();
    })
    .catch((err) => next(err));
  
}

module.exports = passwordController;
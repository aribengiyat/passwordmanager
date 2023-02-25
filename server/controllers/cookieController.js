
const cookieController = {};

cookieController.setSSIDCookieReg = (req, res, next) => {
  console.log('cookie1')
  const username = res.locals.added.username;
  console.log('inside of cookie')
  res.cookie('SSID', username)
  return next();
};

cookieController.setSSIDCookieLogin = (req, res, next) => {
  console.log('cookie2')
  const username = req.body.username;
  console.log('inside of cookielog', username)
  res.cookie('SSID', username)
  return next();
};

module.exports = cookieController;3
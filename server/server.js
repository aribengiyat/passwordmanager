const express = require('express');
const userController = require('./controllers/userControllers');
const passwordController = require('./controllers/passwordControllers');
const cookieController = require('./controllers/cookieController');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const path = require('path');
const DIST_DIR = path.join(__dirname, '../client/build')


const PORT = 3000;

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(DIST_DIR));



//registers and sets cookie
app.post('/register', userController.addData,  (req, res) => {
  console.log('at the end, cookie is ', res.cookies)
  res.json('you did it!')
})

//login route that returns true/false
app.post('/login', userController.checkPass, cookieController.setSSIDCookieLogin, (req, res) => {
  console.log('inside of endpoint login', res.locals.result)
  if (res.locals.result) res.json(res.locals.result)
  else next('Error occured');
})

//this adds data to storedData in users
app.post('/data', userController.isLoggedIn, passwordController.addPassword, (req, res) => {
  res.json(res.locals.addPass)
})

app.get('/data', userController.isLoggedIn, passwordController.getPasswords, (req, res) => {
  res.json(res.locals.passwords)
})

//unknown route handler
app.use('*', (req, res) => {
  res.status(404).json('Double check the url!')
})

app.use((err, req, res, next) => {
  const defaultErr = { log: 'Unspecified err occured', status: 500, message: 'An error occured'};
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  res.status(errObj.status).json(errObj.message);
})

app.listen(PORT, () => {
    console.log('Server listening on 3000.................')
});
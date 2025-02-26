var express = require('express');
const { signUp, login } = require('../controller/user.controller');
var router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup',
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 5 }).withMessage('Password must be atleast 5 characters long'),
  body('fullName').isLength({ min: 3 }).withMessage('Full Name must be atleast 3 characters long'),
  signUp)

router.post('/login',
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 5 }).withMessage('Password must be atleast 5 characters long'),
login)

module.exports = router;

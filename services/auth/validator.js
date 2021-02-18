var { check } = require('express-validator');

//https://express-validator.github.io/docs/validation-chain-api.html
//https://github.com/validatorjs/validator.js#validators

var validateUserSignup = () => {
  return [
    check('input_email', 'Invalid Email')
      .isLength({ min: 6, max: 100 })
      .not()
      .isEmpty()
      .isEmail(),
    check(
      'input_password',
      'Password must be between 6 to 50 characters and 1 uppercase character'
    )
      .notEmpty()
      .isLength({ min: 6, max: 50 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/, 'i'),
  ];
};
module.exports = {
  validateUserSignup,
};

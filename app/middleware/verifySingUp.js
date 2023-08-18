const db = require('../models')
const User = db.users

/* consulto si el correo se esta usando */
exports.validateEmail = (email) =>{
  const wantedEmail = User.findOne({ where: {email: email} })
  return wantedEmail
}
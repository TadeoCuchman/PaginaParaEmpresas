const jwt = require('jsonwebtoken')

const TOKEN_SECRET = 'Ratapacatumbambarandataracaleiaretacarepumbañ';

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {

  const token = req.header('auth-token')
  if (!token) {
    return res.status(401).json({succes:false, message: 'Acceso denegado' })
  }

  try {
    const verified = jwt.verify(token, TOKEN_SECRET)
    req.user = verified
    next(); // continuamos
    
  } catch (error) {
    return res.status(400).json({succes:false, message: 'El Token no es válido'})
  }
}

module.exports = {
  verifyToken,
  TOKEN_SECRET
};
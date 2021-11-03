const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { TOKEN_SECRET, verifyToken } = require('../middlewares/jwt-validate');
const pool = require('../database/index')

const router = express.Router()


router.get('/allPlaces', verifyToken, async (req, res) => {
    try{
        const places = await pool.query('SELECT * FROM plantas ORDER BY id')
        const array = places.rows
        
    
        return res.json({ success: true, message: 'Todas las Plantas', array}).status(200)
    
      } catch (err) {
        return res.json({ success: false, message: 'Error en conexión con Base de Datos.' + JSON.stringify(err)}).status(400)      }
})


router.post('/newPlace', verifyToken, async (req, res) => {

    try {
        

    } catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)})
    }
})







module.exports = router;
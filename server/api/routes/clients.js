const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { TOKEN_SECRET, verifyToken } = require('../middlewares/jwt-validate');
const pool = require('../database/index')

const router = express.Router()


router.get('/allClients', verifyToken, async (req, res) => {
    try{
        const clients = await pool.query('SELECT * FROM clientes ORDER BY id')
        const array = clients.rows
    
        return res.json({ success: true, message: 'Todos los Clientes', array}).status(200)
    
      } catch (err) {
        return res.json({ success: false, message: 'Error en conexión con Base de Datos.' + JSON.stringify(err)}).status(500)
      }
})


router.post('/newClient', verifyToken, async (req, res) => {

    try {
        if (req.body.razon_social && req.body.nombre_fantasia && req.body.rut){
            const client = await pool.query('SELECT * FROM clientes WHERE nombre_fantasia = $1;', [req.body.nombre_fantasia])
        
            if (client.rowCount > 0) {
                return res.json({success: false, message: 'Cliente Ya Ingresado.'}).status(400)
            }
            
            await pool.query('INSERT INTO clientes (razon_social, nombre_fantasia, rut) VALUES ($1, $2, $3)', [req.body.razon_social, req.body.nombre_fantasia, req.body.rut])
            
            const newUser = await pool.query('SELECT * FROM clientes WHERE nombre_fantasia = $1', [req.body.nombre_fantasia])
            const array = newUser.rows
      
            if( array.length > 0 ) {
                return res.json({ succes: true, message: 'Cliente Ingresado Exitosamente.', array}).status(200)
            } else {
                return res.json({ success: false, message: 'Error al registrar Usuario. Se perdió conexión con Base de Datos.', array})
            }
        } else {
            return res.json({success: false, message: 'Faltan Datos.'}).status(400)
        }

    } catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
})

router.put('/:id', verifyToken, async (req, res) => {
    try{
        const changeClient = await pool.query('SELECT * FROM clientes WHERE id = $1',[req.params.id])
        const array = changeClient.rows
        if (array.length > 0){
            const client = await pool.query('UPDATE clientes SET razon_social = $1, nombre_fantasia = $2, rut = $3 WHERE id = $4',[req.body.razon_social, req.body.nombre_fantasia, req.body.rut, req.params.id])
            return res.json({ success: true, message:' Actualización Exitosa', client})

        } else {
            return res.json({ success: false, message:"Cliente no encontrado."})
        }

    } catch (err) {
        return res.json({ success: false, message:"No conexión con Base de Datos." + JSON.stringify(err) }).status(500)
    }
    
})







module.exports = router;
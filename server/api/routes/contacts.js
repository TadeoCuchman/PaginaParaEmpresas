const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { TOKEN_SECRET, verifyToken } = require('../middlewares/jwt-validate');
const pool = require('../database/index')

const router = express.Router()


router.get('/allContacts', verifyToken, async (req, res) => {
    try {
        const contactsNP = await pool.query('SELECT * FROM contactos WHERE planta_id IS NULL AND cliente_id IS NULL ORDER BY id')
        const contactsPlantas = await pool.query('SELECT contactos.*, plantas.nombre_fantasia FROM contactos INNER JOIN plantas ON contactos.planta_id = plantas.id ORDER BY id')
        const contactsClientes = await pool.query('SELECT contactos.*, clientes.nombre_fantasia FROM contactos INNER JOIN clientes ON contactos.cliente_id = clientes.id ORDER BY id')

        const arraycontactsNP = contactsNP.rows
        const arraycontactsPlantas = contactsPlantas.rows
        const arraycontactsClientes = contactsClientes.rows
        return res.json({ success: true, message: 'Todos los Contactos', arraycontactsNP, arraycontactsPlantas, arraycontactsClientes  }).status(200)
    

    }catch (err) {
        return res.json({ success: false, message: 'Error en conexión con Base de Datos.' + JSON.stringify(err)}).status(500)    
    }
})

router.get('/contactsClients', verifyToken, async (req, res) => {
   try { 
        const contactsClientes = await pool.query('SELECT contactos.*, clientes.nombre_fantasia FROM contactos INNER JOIN clientes ON contactos.cliente_id = clientes.id ORDER BY id')

        const arraycontactsClientes = contactsClientes.rows

        return res.json({ success: true, message: 'Todos los Contactos', arraycontactsClientes  }).status(200)

} catch (err) {
    return res.json({ success: false, message: 'Error en conexión con Base de Datos.' + JSON.stringify(err)}).status(500)    
}
})

router.post('/newContact', verifyToken, async (req, res) => {

    try {
        if(req.body.name && req.body.mail && req.body.cel && req.body.rol) {
            const contact = await pool.query('SELECT * FROM contactos WHERE nombre = $1 OR mail = $2;', [req.body.name, req.body.mail])
            
            if(contact.rowCount > 0){
                return res.json({success: false, message: 'Contacto Ya Existente.'}).status(400)
            }

            if ( /^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
                return res.status(400).json({ success: false, message: 'Mail Incorrecto.' })
            } 

            await pool.query('INSERT INTO contactos (nombre, planta_id, cliente_id, mail, cel, tel, rol) VALUES($1, $2, $3, $4, $5, $6, $7)', [req.body.name, req.body.planta_id, req.body.cliente_id, req.body.mail, req.body.cel, req.body.tel, req.body.rol])

            const newUser = await pool.query('SELECT * FROM contactos WHERE nombre = $1 AND mail = $2;', [req.body.name, req.body.mail])
            const array = newUser.rows
            
            if (array.length > 0){
                return res.json({ succes: true, message: 'Usuario Creado Exitosamente.', array}).status(200)
            }else {
                return res.json({ success: false, message: 'Error al registrar Contacto. Se perdió conexión con Base de Datos.', array})
              }

        } else {
            return res.json({success: false, message: 'Faltan Datos.'}).status(400)
        }

    } catch (err) {
        return res.json({ success: false, message: 'Error de conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
})


router.put('/:id', verifyToken, async (req, res) => {
    try{
        const changeContact = await pool.query('SELECT * FROM contactos WHERE id = $1',[req.params.id])
        const array = changeContact.rows
        if (array.length > 0){
            const contact = await pool.query('UPDATE contactos SET nombre = $1, planta_id = $2, cliente_id = $3, mail = $4, tel = $5, cel = $6, rol = $7 WHERE id = $8',[req.body.name, req.body.cliente_id, req.body.planta_id, req.body.mail, req.body.tel, req.body.cel, req.body.rol, req.params.id])
            return res.json({ success: true, message:' Actualización Exitosa', contact})

        } else {
            return res.json({ success: false, message:"Contacto no encontrado."})
        }

    } catch (err) {
        return res.json({ success: false, message:"No conexión con Base de Datos." + JSON.stringify(err) }).status(500)
    }
    
})



module.exports = router;
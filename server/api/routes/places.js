const express = require('express')
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
        return res.json({ success: false, message: 'Error en conexión con Base de Datos.' + JSON.stringify(err)}).status(500)      }
})

// todos los silos de una Planta determinada
router.get('/allSilos/:id', verifyToken, async (req, res) => {
    try {
        const place = req.params.id

        const silos = await pool.query('SELECT * FROM silos WHERE planta_id = $1', [place])
        const array = silos.rows

        return res.json({ success: true, message: 'Todos los Silos de la planta ' + place, array}).status(200)


    } catch (err) {
        return res.json({ success: false, message: 'Error en conexión con Base de Datos.' + JSON.stringify(err)}).status(500)      
    }
})


router.post('/newPlace', verifyToken, async (req, res) => {
    try {
        if(req.body.nombre_fantasia, req.body.localidad, req.body.latitud, req.body.longitud, req.body.padron, req.body.cantidadDeSilos){
            const place = await pool.query('SELECT * FROM plantas WHERE padron = $1', [req.body.padron])
            const silos = req.body.silos
            
            if (place.rowCount > 0) {
                return res.json({success: false, message: 'Planta Ya Ingresada en Base de Datos.' + place.rows}).status(400)
            }

            await pool.query('INSERT INTO plantas (cliente_id, nombre_fantasia, localidad, lat, lng, padron, cantidad_de_silos) VALUES ($1, $2, $3, $4, $5, $6, $7)', [req.body.cliente_id, req.body.nombre_fantasia, req.body.localidad, req.body.latitud, req.body.longitud, req.body.padron, req.body.cantidadDeSilos])
            const newPlaceId = await pool.query('SELECT id FROM plantas WHERE padron = $1', [req.body.padron])
            
            for (var i = 0; i < silos.length; i++){
                await pool.query('INSERT INTO silos (planta_id, tipo_de_silo, toneladas, nombre_de_silo) VALUES ($1, $2, $3, $4)', [newPlaceId.rows[0].id, silos[i].tipo, silos[i].toneladas, silos[i].nombre])
            }


            return res.json({ succes: true, message: 'Planta Ingresada Exitosamente.', place}).status(200)



        } else {
            return res.json({success: false, message: 'Faltan Datos.'}).status(400)
        }

    } catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
})




router.put('/:id', verifyToken, async (req, res) => {

})





module.exports = router;
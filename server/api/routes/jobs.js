const express = require('express')
const { TOKEN_SECRET, verifyToken } = require('../middlewares/jwt-validate');
const pool = require('../database/index');

const router = express.Router()

// todos los trabajos
router.get('/allJobs', verifyToken, async (req, res) => {
    try{
        const allJobs = await pool.query('SELECT * FROM trabajos ORDER BY id')
        const array = allJobs.rows

        return res.json({ success: true, message: 'Todos los Trabajos', array}).status(200)

    }catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
}) 


// todos los gastos
router.get('/allExpences/:id', verifyToken, async (req,res) => {
    try {
        const trabajoId = req.params.id
        const allSpences = await pool.query('SELECT * FROM gastos WHERE id_trabajo = $1 ORDER BY fecha_gasto', [trabajoId])
        const array = allSpences.rows

        return res.json({ success: true, message: 'Todos los Gastos del trabajo' + trabajoId, array}).status(200)

    } catch {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
})

//agrega trabajo
// falta integrar la entrada de silos para cada trabajo
router.post('/addJob', verifyToken, async (req, res) => {
    try { 
        if (req.body.cliente_id, req.body.planta_id, req.body.start_date, req.body.typeOfJob) { 
            const silos = req.body.silosArray

            await pool.query('INSERT INTO trabajos (cliente_id, planta_id, fecha_de_inicio, tipo_de_trabajo, descripcion, cantidad_de_silos, entregado, terminado, facturado, vigente) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [req.body.client_id, req.body.place_id, req.body.start_date, req.body.typeOfJob, req.body.description, req.body.cantidadDeSilos, false, false, false, true])
            
            const newJobId = await pool.query('SELECT MAX(id) FROM trabajos')

            
            for (var i = 0; i < silos.length - 1; i++){
                if (silos[i].checkbox === true){
                    await pool.query('INSERT INTO silos_trabajo (id_trabajo, id_silo, cantidad_de_substrato, tipo_de_producto, cantidad_de_producto) VALUES ($1, $2, $3, $4, $5)', [newJobId.rows[0].max, silos[i].silo_Id, silos[i].cantidad_de_substrato, silos[i].tipo_de_producto, silos[i].cantidad_de_producto])
                }
            }

            return res.json({ succes: true, message: 'Trabajo Ingresado Exitosamente.'}).status(200)


        } else {
            return res.json({success: false, message: 'Faltan Datos.'}).status(400)
        }
        
    } catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
})

router.post('/addToJob', verifyToken, async (req, res) => {
    try {
        if (req.body.trabajo_id, req.body.tipo, req.body.costo, req.body.no_factura, req.body.rut, req.body.proveedor){

            
        }
        

    } catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
})



module.exports = router;
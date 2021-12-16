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

// todos los trabajos en proceso = con "previa===true"
router.get('/onProcess', verifyToken, async (req, res) => {
    try{
        const allJobsOnProcess = await pool.query('	SELECT trabajos.*, clientes.nombre_fantasia, plantas.nombre_fantasia AS nombre_fantasia_planta FROM trabajos INNER JOIN clientes ON trabajos.cliente_id = clientes.id INNER JOIN plantas ON trabajos.planta_id = plantas.id WHERE previa = true AND entregado = false AND terminado = false AND facturado = false AND vigente = true  ORDER BY id ') 
        const array = allJobsOnProcess.rows

        return res.json({ success: true, message: 'Todos los Trabajos En Proceso.', array}).status(200)

    }catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
}) 

// todos los trabajos en entregados = con "entregado===true"
router.get('/delivereds', verifyToken, async (req, res) => {
    try{
        const allJobsDelivered = await pool.query('SELECT trabajos.*, clientes.nombre_fantasia, plantas.nombre_fantasia AS nombre_fantasia_planta FROM trabajos INNER JOIN clientes ON trabajos.cliente_id = clientes.id INNER JOIN plantas ON trabajos.planta_id = plantas.id WHERE previa = true AND entregado = true AND terminado = false AND facturado = false AND vigente = true ORDER BY id') 
        const array = allJobsDelivered.rows

        return res.json({ success: true, message: 'Todos los Trabajos En Proceso.', array}).status(200)

    }catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
}) 

//todos los trabajos cerrados por admin 'terminados===true'
router.get('/closeds', verifyToken, async (req, res) => {
    try{
        const allJobsDelivered = await pool.query('SELECT trabajos.*, clientes.nombre_fantasia, plantas.nombre_fantasia AS nombre_fantasia_planta FROM trabajos INNER JOIN clientes ON trabajos.cliente_id = clientes.id INNER JOIN plantas ON trabajos.planta_id = plantas.id WHERE previa = true AND entregado = true AND terminado = true AND facturado = false AND vigente = true ORDER BY id') 
        const array = allJobsDelivered.rows

        return res.json({ success: true, message: 'Todos los Trabajos En Proceso.', array}).status(200)

    }catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
}) 

//todos los trabajos facturados 'facturados===true'
router.get('/finisheds', verifyToken, async (req, res) => {
    try{
        const allJobsDelivered = await pool.query('SELECT trabajos.*, clientes.nombre_fantasia, plantas.nombre_fantasia AS nombre_fantasia_planta FROM trabajos INNER JOIN clientes ON trabajos.cliente_id = clientes.id INNER JOIN plantas ON trabajos.planta_id = plantas.id WHERE previa = true AND entregado = true AND terminado = true AND facturado = true AND vigente = true ORDER BY id') 
        const array = allJobsDelivered.rows

        return res.json({ success: true, message: 'Todos los Trabajos ya facturados.', array}).status(200)

    }catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
}) 

//información de un solo trabajo
router.get('/infoJob/:id', verifyToken, async (req, res) => {
    try{
        const Job = await pool.query('SELECT * FROM trabajos WHERE id = $1 ORDER BY id', [req.params.id])
        const array = Job.rows[0]

        return res.json({ success: true, message: 'Todos los Trabajos', array}).status(200)

    } catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)})
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

// todos los gastos por cliente
router.get('/allExpences/:clientID', verifyToken, async (req,res) => {
    try {
        const ClienteId = req.params.clientID
        const allSpences = await pool.query('SELECT * FROM gastos WHERE client_id = $1', [ClienteId])

        return res.json({ success: true, message: 'Todos los Gastos del cliente' + ClienteId + allSpences, array}).status(200)

    } catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }

})

//agrega trabajo
router.post('/addJob', verifyToken, async (req, res) => {
    try { 
        if (req.body.cliente_id, req.body.planta_id, req.body.start_date, req.body.typeOfJob) { 
            const silos = req.body.silosArray
            const date = new Date()

            await pool.query('INSERT INTO trabajos (cliente_id, planta_id, codigo, fecha_de_inicio, tipo_de_trabajo, descripcion, cantidad_de_silos, previa, entregado, terminado, facturado, vigente, fecha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [req.body.client_id, req.body.place_id, req.body.code, req.body.start_date, req.body.typeOfJob, req.body.description, req.body.cantidadDeSilos, true ,false, false, false, true, date])
            
            const newJobId = await pool.query('SELECT MAX(id) FROM trabajos')

            
            for (var i = 0; i < silos.length; i++){
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


// agrega GASTOS al trabajo 
router.post('/addToJob/:id', verifyToken, async (req, res) => {
    try {   
        if (req.body.trabajo_id, req.body.tipo, req.body.costo, req.body.no_factura, req.body.rut, req.body.proveedor, req.body.fecha_gasto){
            await pool.query('INSERT INTO gastos (id_trabajo, usuario_id, insumo, costo, moneda, cantidad, no_factura, rut, proveedor, no_receta, descripcion, noches_hospedaje, entrada_fecha_hospedaje, fecha_gasto, tipo_gasto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',[req.params.id, req.user.id, req.body.insumo, req.body.costo, req.body.moneda, req.body.cantidad, req.body.no_factura, req.body.rut, req.body.proveedor, req.body.no_receta, req.body.descripcion, req.body.noches, req.body.fecha_entrada, req.body.fecha_gasto, req.body.tipo])
            
            return res.json({ succes: true, message: 'Gasto Ingresado Exitosamente.'}).status(200)
        } else {
            return res.json({success: false, message: 'Faltan Datos Clave.'}).status(400)
        }
        

    } catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
})

// entragar trabajo desde el punto de vista del operario 
router.post('/deliverJob/:id', verifyToken, async (req, res) => {
    try{
        const date = new Date()

        await pool.query('UPDATE trabajos SET vigente = false WHERE id = $1', [req.params.id])
        await pool.query('INSERT INTO trabajos (codigo, cliente_id, planta_id, fecha_de_inicio, tipo_de_trabajo, descripcion, cantidad_de_silos, previa, entregado, terminado, facturado, vigente, fecha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [req.body.codigo, req.body.cliente_id, req.body.planta_id, req.body.fecha_de_inicio, req.body.tipo_de_trabajo, req.body.descripcion, req.body.cantidad_de_silos, true ,true, false, false, true, date])

        return res.json({ succes: true, message: 'Trabajo Entregado Exitosamente.'}).status(200)

    } catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
})

// entragar trabajo desde el punto de vista del administrador 
router.post('/closeJob/:id', verifyToken, async (req, res) => {
    try{
        const date = new Date()

        await pool.query('UPDATE trabajos SET vigente = false WHERE id = $1', [req.params.id])
        await pool.query('INSERT INTO trabajos (codigo, cliente_id, planta_id, fecha_de_inicio, tipo_de_trabajo, descripcion, cantidad_de_silos, previa, entregado, terminado, facturado, vigente, fecha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [req.body.codigo, req.body.cliente_id, req.body.planta_id, req.body.fecha_de_inicio, req.body.tipo_de_trabajo, req.body.descripcion, req.body.cantidad_de_silos, true ,true, true, false, true, date])

        return res.json({ succes: true, message: 'Trabajo Cerrado Exitosamente.'}).status(200)

    } catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
})

// agregar a trabajos facturados
router.post('/finishJob/:id', verifyToken, async (req, res) => {
    try{
        const date = new Date()

        await pool.query('UPDATE trabajos SET vigente = false WHERE id = $1', [req.params.id])
        await pool.query('INSERT INTO trabajos (codigo, cliente_id, planta_id, fecha_de_inicio, tipo_de_trabajo, descripcion, cantidad_de_silos, previa, entregado, terminado, facturado, vigente, fecha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [req.body.codigo, req.body.cliente_id, req.body.planta_id, req.body.fecha_de_inicio, req.body.tipo_de_trabajo, req.body.descripcion, req.body.cantidad_de_silos, true ,true, true, true, true, date])

        return res.json({ succes: true, message: 'Trabajo Pasado a Facturacion Exitosamente.'}).status(200)

    } catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
})


module.exports = router;
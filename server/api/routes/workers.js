const express = require('express')
const { TOKEN_SECRET, verifyToken } = require('../middlewares/jwt-validate');
const pool = require('../database/index')
const multer = require("multer");

var uploadPhoto = multer({ dest: '../React/setadolsaapi/public/uploads/profilePhotos'});
var uploadPdfs = multer({ dest: '../React/setadolsaapi/public/uploads/capacitacionesPdf'});



const router = express.Router()


router.get('/allWorkers', verifyToken, async (req, res) => {
    try{
        const workers = await pool.query('SELECT * FROM operarios ORDER BY alta_bps')
        const array = workers.rows

        return res.json({ success: true, message: 'Todos los Operarios', array}).status(200)


    }catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
})

// ingresar nuevo operario
// falta validar fechas (preguntar cuales son los rangos)
router.post('/newWorker', verifyToken, async (req, res) => {
    try {
        if(req.body.name, req.body.ci, req.body.bornDate, req.body.adress, req.body.cel, req.body.mail, req.body.altaBps, req.body.carnetS){
          const worker = await pool.query('SELECT * FROM operarios WHERE nombre_apellido = $1 AND ci = $2',[req.body.name, req.body.ci])
          
          if (worker.rowCount > 0) {
              return res.json({success: false, message: 'Operario Ya Ingresado en Base de Datos.' + worker.rows}).status(400)
          }
      
          if ( /^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
              return res.status(400).json({ success: false, message: 'Mail Incorrecto.' })
          } 

          await pool.query('INSERT INTO operarios (nombre_apellido,ci,fecha_de_nacimiento,direccion,telefono_emergencia,celular,email,alta_bps,baja_bps, carnet_de_salud,telefono) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [req.body.name, req.body.ci, req.body.bornDate, req.body.adress, req.body.cel, req.body.tel, req.body.mail, req.body.altaBps, req.body.bajaBps, req.body.carnetS, req.body.emergencyTel])

          const newWorker = await pool.query('SELECT * FROM operarios WHERE nombre_apellido = $1 AND ci = $2',[req.body.name, req.body.ci])
          const array = newWorker.rows

          if (array.length > 0){
              return res.json({ succes: true, message: 'Operario Ingresado Exitosamente.', array}).status(200)
          } else {
              return res.json({ success: false, message: 'Error al registrar Operario. Se perdió conexión con Base de Datos.', array}).status(400)
            }
        } else {
            return res.json({success: false, message: 'Faltan Datos.'}).status(400)
        }

    } catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
})

// arreglar formato en que se guardan los archivos 
router.post("/uploadPdfs", uploadPdfs.array("file"), async (req, res) => {
  try {    
    if (req.file) {
      res.send({
        status: true,
        message: "Certificados guardados exitosamente.",    
      });
    } else {
      res.status(400).send({
        status: false,
        message: "File Not Found :(",
        
      });
    }
  } catch (err) {
      return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
  }
});



router.post("/uploadPhoto", uploadPhoto.single("file"), async (req, res) => {
    try {    
      if (req.file) {
        res.send({
          status: true,
          message: 'Se guardo la foto de perfil.',    
        });
      } else {
        res.status(400).send({
          status: false,
          message: "File Not Found :(",
          
        });
      }
    } catch (err) {
        return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
    }
  });


router.put('/:id', verifyToken, async (req, res) => {
  try {
    const worker = await pool.query('SELECT * FROM workers WHERE id = $1', [req.params.id])

    if (place.rowCount === 0) {
      return res.json({success: false, message: 'Operario no encontrado.' + worker.rows}).status(400)
    }

    if ( req.body.adress !== worker[0].direccion || req.body.altaBps !== worker[0].alta_bps || req.body.bajaBps !== worker[0].baja_bps || req.body.bornDate !== worker[0].fecha_de_nacimiento || req.body.carnetS !== worker[0].carnet_de_salud ||  req.body.cel !== worker[0].celular || req.body.ci !== worker[0].ci || req.body.emergencyTel !== req.body.telefono_emergencia || req.body.mail !== req.body.mail || req.body.name !== worker[0].nombre_apellido || req.body.tel !== worker[0].telefono){
      await pool.query('UPDATE operarios SET nombre_apellido = $1 , ci = $2 , fecha_de_nacimiento = $3 , direccion = $4 , celular = $5 , telefono_emergencia = $6, mail = $7 , alta_bps = $8 , baja_bps = $9 , carnet_de_salud = $10 , telefono = $11 WHERE id = $12', [req.body.name, req.body.id, req.body.bornDate, req.body.adress, req.body.cel, req.body.emergencyTel, req.body.mail, req.body.altaBps, req.body.bajaBps, req.body.carnetS, req.body.tel ])
      
      return res.json({ succes: true, message: 'Operario Actualizado Exitosamente.', array}).status(200)
    
    } else {
      return res.json({success: false, message: 'No se han hecho cambios'}).status(400)
    }

    
    
    
    
  }catch(err) {
    return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
  }
})

module.exports = router;
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { TOKEN_SECRET, verifyToken } = require('../middlewares/jwt-validate');
const pool = require('../database/index')

const router = express.Router()



router.delete('/:id', async (req, res) => {

  const user = await pool.query('DELETE ')

  res.json({ success: true, message: 'Lista de uruarios:', usuarios })
});



// registrar un usuario
router.post('/register', verifyToken, async (req, res) => {
  try {
    if (req.body.mail && req.body.name && req.body.password && req.body.rol) {
      const user = await pool.query('SELECT * FROM users WHERE name = $1 OR mail = $2;', [req.body.name, req.body.mail])
      
      if (user.rowCount > 0) {
          return res.json({success: false, message: 'Usuario Ya Creado'}).status(400)
        }

        // Formato del mail
      if ( /^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
        return res.status(400).json({ success: false, message: 'Mail Incorrecto.' })
      } 

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      await pool.query('INSERT INTO users (name, mail, rol, password) VALUES($1, $2, $3, $4)', [req.body.name, req.body.mail, req.body.rol, password])
      
      const newUser = await pool.query('SELECT * FROM users WHERE name = $1 AND mail = $2', [req.body.name, req.body.mail])
      const array = newUser.rows
      
      if( array.length > 0 ) {
        return res.json({ succes: true, message: 'Usuario Creado Exitosamente.', array}).status(200)
      
      } else {
        return res.json({ success: false, message: 'Error al registrar Usuario. Se perdió conexión con Base de Datos.', array})
      }


    } else {
      return res.json({success: false, message: 'Faltan Datos.'}).status(400)
    }
      
  } catch (err) {
    return res.json({ success: false, message: 'Error con la conexión con la Base de Datos' + JSON.stringify(err)}).status(500)
  }

});

// login un usuario
router.post('/login', async (req, res) => {
  
 try { 
  const user = await pool.query('SELECT * FROM users WHERE name = $1;', [req.body.name])
  const array = user.rows

  if (user.rowCount <= 0) {
    return res.status(400).json({ error: 'Usuario no encontrado' });
  }
  
  const validPassword = await bcrypt.compare(req.body.password, array[0].password);
  if (!validPassword) {
    return res.status(400).json({ error: "Usuario y Contraseña no Cohinciden."});
  }
  
  // Crear el token 
  const token = jwt.sign({
    id: array[0].id,
    name: array[0].name,
    mail: array[0].mail,
    rol: array[0].rol
  }, TOKEN_SECRET);
  
  res.json({ error: null, message: 'Loggin Exitoso.', token, user: array[0] }).status(200);
 
} catch (err) {
  return res.json({ success: false, message: 'Error en conexión con Base de Datos.' + JSON.stringify(err)}).status(500)
 }
});
  
  //Listar usuarios solo puede ser consumida por alguien autorizado
router.get('/allUsers', verifyToken, async (req, res) => {
  try{
    const users = await pool.query('SELECT * FROM users ORDER BY id')
    const array = users.rows
    

    return res.json({ success: true, message: 'Every User', array}).status(200)

  } catch (err) {
    return res.json({ success: false, message: 'Error with database looking for all users' + JSON.stringify(err)}).status(500)
  }
});

//Actualizar datos de un usuario
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const changeUser = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id])
    const array = changeUser.rows
    if (array.length > 0){
      const user = await pool.query('UPDATE users SET name = $1, mail = $2, rol = $3 WHERE id = $4', [req.body.name, req.body.mail, req.body.rol, req.params.id])
      
      return res.json({ success: true, message:' Actualización Exitosa', user})
    }else {
      return res.json({ success: false, message:"Usuario no encontrado."})
    }

  } catch (err) {
    return res.json({ success: false, message:"No conexión con Base de Datos." + JSON.stringify(err) }).status(500)
  }
})


module.exports = router;
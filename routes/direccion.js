/*
 Ruta: /api/direccions
 */

const { Router } = require('express');
const router = Router();
const {
    getDireccions,
    crearDireccion,
    actualizarDireccion,
    borrarDireccion,
    getDireccion,
} = require('../controllers/direccionController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/direcciones/:id', getDireccions);

router.post('/direccion/registro', [
    check('direccion', 'El direccion es necesario').not().isEmpty(),
    validarCampos
], crearDireccion);

router.put('/direccion/update/:id', [
    check('direccion', 'El direccion es necesario').not().isEmpty(),
    validarCampos
], actualizarDireccion);

router.delete('/direccion/remove/:id', validarJWT, borrarDireccion);

router.get('/direccion/data/:id', getDireccion);



module.exports = router;
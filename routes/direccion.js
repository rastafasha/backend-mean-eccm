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

router.get('/', getDireccions);

router.post('/', [
    validarJWT,
    check('direccion', 'El direccion del categoria es necesario').not().isEmpty(),
    validarCampos
], crearDireccion);

router.put('/:id', [
    validarJWT,
    check('direccion', 'El direccion del categoria es necesario').not().isEmpty(),
    validarCampos
], actualizarDireccion);

router.delete('/:id', validarJWT, borrarDireccion);

router.get('/:id', validarJWT, getDireccion);



module.exports = router;
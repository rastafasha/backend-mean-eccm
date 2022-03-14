/*
 Ruta: /api/color
 */

const { Router } = require('express');
const router = Router();
const {
    getColors,
    crearColor,
    actualizarColor,
    borrarColor,
    // getColor
} = require('../controllers/colorController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getColors);

router.post('/', [
    validarJWT,
    check('titulo', 'El titulo del categoria es necesario').not().isEmpty(),
    validarCampos
], crearColor);

router.put('/:id', [
    validarJWT,
    check('titulo', 'El titulo del categoria es necesario').not().isEmpty(),
    validarCampos
], actualizarColor);

router.delete('/:id', validarJWT, borrarColor);

// router.get('/:id', validarJWT, getColor);


module.exports = router;
/*
 Ruta: /api/congeneral
 */

const { Router } = require('express');
const router = Router();
const {
    getCongenerals,
    crearCongeneral,
    actualizarCongeneral,
    borrarCongeneral,
    getCongeneral,
    slider,
    getSlider,
    getSliderOne
} = require('../controllers/congeneralController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getCongenerals);

router.post('/', [
    validarJWT,
    check('titulo', 'El titulo del categoria es necesario').not().isEmpty(),
    validarCampos
], crearCongeneral);

router.put('/:id', [
    validarJWT,
    check('titulo', 'El titulo del categoria es necesario').not().isEmpty(),
    validarCampos
], actualizarCongeneral);

router.delete('/:id', validarJWT, borrarCongeneral);

router.get('/:id', validarJWT, getCongeneral);
router.get('/obtener', getCongenerals);


router.put('/slider/update/:id/:banner?', slider);
router.get('/slider/obtener', getSlider);
router.get('/slider/one/:id', getSliderOne);


module.exports = router;
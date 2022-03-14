/*
 Ruta: /api/venta
 */

const { Router } = require('express');
const router = Router();
const {
    getVentas,
    crearVenta,
    actualizarVenta,
    borrarVenta,
    getVenta,
} = require('../controllers/ventaController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getVentas);

router.post('/', [
    validarJWT,
    check('direccion', 'El direccion del categoria es necesario').not().isEmpty(),
    validarCampos
], crearVenta);

router.put('/:id', [
    validarJWT,
    check('direccion', 'El direccion del categoria es necesario').not().isEmpty(),
    validarCampos
], actualizarVenta);

router.delete('/:id', validarJWT, borrarVenta);

router.get('/:id', validarJWT, getVenta);


module.exports = router;
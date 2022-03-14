/*
 Ruta: /api/carrito
 */

const { Router } = require('express');
const router = Router();
const {
    getCarritos,
    crearCarrito,
    actualizarCarrito,
    borrarCarrito,
    getCarrito,
    previewCarrito,
    removeCarrito

} = require('../controllers/carritoController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getCarritos);

router.post('/', [
    validarJWT,
    check('cantidad', 'El cantidad del categoria es necesario').not().isEmpty(),
    validarCampos
], crearCarrito);

router.put('/:id', [
    validarJWT,
    check('cantidad', 'El cantidad del categoria es necesario').not().isEmpty(),
    validarCampos
], actualizarCarrito);

router.delete('/:id', validarJWT, borrarCarrito);

router.get('/:id', validarJWT, getCarrito);

router.get('/limit/data/:id', previewCarrito);
router.delete('/delete/:id', removeCarrito);


module.exports = router;
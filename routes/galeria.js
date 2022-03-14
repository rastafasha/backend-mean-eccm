/*
 Ruta: /api/galerias
 */

const { Router } = require('express');
const router = Router();
const {
    getGalerias,
    crearGaleria,
    actualizarGaleria,
    borrarGaleria,
    getGaleria,
    findByProduct
} = require('../controllers/galeriaController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getGalerias);

router.post('/', [
    validarJWT,
    check('tipo', 'El tipo del categoria es necesario').not().isEmpty(),
    validarCampos
], crearGaleria);

router.put('/:id', [
    validarJWT,
    check('tipo', 'El tipo del categoria es necesario').not().isEmpty(),
    validarCampos
], actualizarGaleria);

router.delete('/:id', validarJWT, borrarGaleria);

router.get('/:id', validarJWT, getGaleria);

router.get('/galeria_producto/find/:id?', findByProduct);



module.exports = router;
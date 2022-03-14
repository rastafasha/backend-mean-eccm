/*
 Ruta: /api/ingresos
 */

const { Router } = require('express');
const router = Router();
const {
    getIngresos,
    crearIngreso,
    actualizarIngreso,
    borrarIngreso,
    getIngreso,
    initData,
    listar,
    detalle
} = require('../controllers/ingresoController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getIngresos);

router.post('/', [
    validarJWT,
    check('tipo', 'El tipo del categoria es necesario').not().isEmpty(),
    validarCampos
], crearIngreso);

router.put('/:id', [
    validarJWT,
    check('tipo', 'El tipo del categoria es necesario').not().isEmpty(),
    validarCampos
], actualizarIngreso);

router.delete('/:id', validarJWT, borrarIngreso);

router.get('/:id', validarJWT, getIngreso);


router.get('/initData', initData);
router.get('/listar/:search/:orden/:tipo', listar);
router.get('/detalle/:id', detalle);



module.exports = router;
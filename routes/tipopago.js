/*
 Ruta: /api/payments
 */

const { Router } = require('express');
const router = Router();
const {
    getPayments,
    crearPayment,
    actualizarPayment,
    borrarPayment,
    getPayment,
} = require('../controllers/tipopagoController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/payments/:id', getPayments);

router.post('/payment/registro', [
    check('type', 'El type es necesario').not().isEmpty(),
    validarCampos
], crearPayment);

router.put('/payment/update/:id', [
    check('type', 'El type es necesario').not().isEmpty(),
    validarCampos
], actualizarPayment);

router.delete('/payment/remove/:id', validarJWT, borrarPayment);

router.get('/payment/data/:id', getPayment);



module.exports = router;
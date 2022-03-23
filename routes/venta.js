/*
 Ruta: /api/ventas
 */

const { Router } = require('express');
const router = Router();
const {
    getVentas,
    crearVenta,
    actualizarVenta,
    borrarVenta,
    getVenta,
    data_detalle,
    finalizar,
    init_data_admin,
    evaluar_cancelacion,
    cancelar,
    listar_cancelaciones,
    get_solicitud,
    reembolsar,
    obtener_data_cancelacion,
    evaluar_orden_coment,
    denegar,
    listar_admin,
    set_track,
    update_enviado,
    listar_ventas_dashboard,
    detalles_hoy
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


router.get('/venta_track/detalle/:id', data_detalle);
router.get('/venta_finalizar/venta/:id', finalizar);
router.get('/venta_admin_init/init_data', init_data_admin);

router.get('/cancelacion_evaluar/venta/:id', evaluar_cancelacion);
router.post('/cancelacion_send/cancelar', cancelar);

router.get('/get_cancelacion_admin/data/:wr?', listar_cancelaciones);
router.get('/get_one_cancelacion_admin/one/:id?', get_solicitud);

router.get('/cancelacion_send/reembolsar/:id/:idticket', reembolsar);
router.get('/cancelacion_venta/obtener_data/:id', obtener_data_cancelacion);

router.get('/evaluar_venta/data/:user/:producto', evaluar_orden_coment);
router.get('/cancelacion_send/denegar/:id/:idticket', denegar);

router.get('/venta_admin/listar/:search/:orden/:tipo', listar_admin);
router.post('/venta_track/set/:id', set_track);
router.get('/venta_enviado/update/:id', update_enviado);
router.get('/venta_data/dashboard', listar_ventas_dashboard);
router.get('/venta_data/detalles/hoy', detalles_hoy);



module.exports = router;
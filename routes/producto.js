/*
 Ruta: /api/productos
 */

const { Router } = require('express');
const router = Router();
const {
    getProductos,
    getProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto,
    find_by_slug,
    listar_newest,
    listar_best_sellers,
    listar_populares,
    cat_by_name,
    listar_papelera,
    listar_cat,
    listar_cat_papelera,
    desactivar,
    activar,
    papelera,
    reducir_stock,
    aumentar_stock,
    aumentar_venta
} = require('../controllers/productoController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getProductos);

router.post('/', [
    validarJWT,
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    validarCampos
], actualizarProducto);

router.delete('/:id', validarJWT, borrarProducto);

router.get('/:id', validarJWT, getProducto);





module.exports = router;
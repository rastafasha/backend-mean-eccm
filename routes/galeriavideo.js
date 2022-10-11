/*
 Ruta: /api/galeriavideos
 */

const { Router } = require('express');
const router = Router();
const {
    getGalerias,
    actualizarGaleria,
    borrarGaleria,
    getGaleria,
    findByCurso,
    crearVideo,
    desactivar,
    activar
} = require('../controllers/galeriaVideoController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getGalerias);



router.post('/galeria/crear', crearVideo);

router.post('/', [
    validarJWT,
    check('video', 'El video es necesario').not().isEmpty(),
    validarCampos
], crearVideo);

router.put('/:idcurso/:id', [
    validarJWT,
    check('video', 'El video es necesario').not().isEmpty(),
    validarCampos
], actualizarGaleria);

router.delete('/:id', validarJWT, borrarGaleria);

router.get('/:id', getGaleria);

router.get('/galeria_curso/find/:id?', findByCurso);

router.get('/curso_admin/admin/desactivar/:id', validarJWT, desactivar);
router.get('/curso_admin/admin/activar/:id', validarJWT, activar);



module.exports = router;
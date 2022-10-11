/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario, getUsuario, actualizarUAdmin } = require('../controllers/usuarios');
const {
    validarJWT,
    validarAdminRole,
    validarAdminRoleOMismoUsuario,
    validarUserRole,
    validarUserRoleOMismoUsuario
} = require('../middlewares/validar-jwt');

router.get('/', validarJWT, getUsuarios);

router.post('/', [
    check('first_name', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validarCampos
], crearUsuarios);

router.put('/:id', [
    validarJWT,
    validarUserRoleOMismoUsuario,
    check('first_name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('role', 'el role es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuario);

// router.put('/:id', [
//     validarJWT,
//     validarAdminRole,
//     validarAdminRoleOMismoUsuario,
//     check('first_name', 'el nombre es obligatorio').not().isEmpty(),
//     check('email', 'el email es obligatorio').isEmail(),
//     check('role', 'el role es obligatorio').not().isEmpty(),
//     validarCampos
// ], actualizarUAdmin);

router.delete('/:id', [validarJWT, validarAdminRole], borrarUsuario);

router.get('/:id', [validarJWT, validarAdminRole], getUsuario);




module.exports = router;
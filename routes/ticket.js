/*
 Ruta: /api/ticket
 */

const { Router } = require('express');
const router = Router();
const {
    getTickets,
    crearTicket,
    actualizarTicket,
    borrarTicket,
    getTicket,
    dataMessenger,
    send,
} = require('../controllers/ticketController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getTickets);

router.post('/', [
    validarJWT,
    check('tema', 'El tema del ticket es necesario').not().isEmpty(),
    validarCampos
], crearTicket);

router.put('/:id', [
    validarJWT,
    check('tema', 'El tema del ticket es necesario').not().isEmpty(),
    validarCampos
], actualizarTicket);

router.delete('/:id', validarJWT, borrarTicket);

router.get('/:id',  getTicket);

router.post('/ticket_msm/send', send);
router.get('/ticket_chat/chat/:de/:para', dataMessenger);
// router.get('/ticket_listar/listar/:id', listarTickets);
// router.get('/ticket_admin/all/:status?/:estado?', listarTodos);



module.exports = router;
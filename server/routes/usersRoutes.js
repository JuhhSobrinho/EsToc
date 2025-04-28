// usersRoutes.js
const express = require('express');
const { signUpUser, loginUser, adicionarMembro, listarMembros, removerMembro } = require('../controllers/usersController');

const router = express.Router();

router.post('/signUp', signUpUser);
router.post('/login', loginUser);
router.post('/adicionar-membro', adicionarMembro);
router.get('/listar-membros', listarMembros);
router.delete('/remove-membros', removerMembro);




module.exports = router;

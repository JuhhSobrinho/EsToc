const express = require('express');
const router = express.Router();

const {
  listarProdutosDoUsuarioESeusMembros,
  listarProdutosComVencendo,
  listarProdutosVencendoPorPeriodo,
  listarQuantidadePorTipo,
  cadastrarProduto,
  buscarTipos,
  deletarProduto
} = require('../controllers/produtosController');

router.get('/', listarProdutosDoUsuarioESeusMembros);
router.get('/todos-com-vencendo', listarProdutosComVencendo);
router.get('/todos-periodo-vencimento', listarProdutosVencendoPorPeriodo);
router.get('/quantidade-por-tipo', listarQuantidadePorTipo);
router.post('/cadastro-de-produtos', cadastrarProduto);
router.get('/tipos-de-produto', buscarTipos);
router.get('/tipos-de-produto', buscarTipos);
router.delete('/deletar-produto', deletarProduto);


module.exports = router;

const supabase = require('../config/db');



async function buscarUidsUsuarioEMembros(uid) {
  const { data: membros, error } = await supabase
    .from('membros')
    .select('membro_uid')
    .eq('dono_uid', uid);

  if (error) {
    throw new Error(error.message);
  }

  const membroUids = membros.map(m => m.membro_uid);
  return [uid, ...membroUids]; // Retorna o uid do dono + os dos membros
}




const listarProdutosDoUsuarioESeusMembros = async (req, res) => {
  try {
    const { uid } = req.query; // Ou `req.user.uid` se você usar autenticação depois
    
    
    if (!uid) {
      return res.status(400).json({ error: "UID do usuário é obrigatório." });
    }

    // 1. Buscar membros que esse usuário adicionou
    const { data: membros, error: errorMembros } = await supabase
      .from('membros')
      .select('membro_uid')
      .eq('dono_uid', uid);

    if (errorMembros) {
      return res.status(500).json({ error: errorMembros.message });
    }

    // 2. Montar a lista de UIDs para buscar os produtos
    const membroUids = membros.map(m => m.membro_uid);
    const uidsParaBuscar = [uid, ...membroUids];

    // 3. Buscar produtos desses usuários
    const { data: produtos, error: errorProdutos } = await supabase
      .from('produtos')
      .select(`
        *,
        tipos (
          nome
        )
      `)
      .in('restaurante_id', uidsParaBuscar); // Aqui é o filtro principal

    if (errorProdutos) {
      return res.status(500).json({ error: errorProdutos.message });
    }

    res.json(produtos);
    
  } catch (err) {
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

async function buscarUidsUsuarioEMembros(uid) {
  const { data: membros, error } = await supabase
    .from('membros')
    .select('membro_uid')
    .eq('dono_uid', uid);

  if (error) {
    throw new Error(error.message);
  }

  const membroUids = membros.map(m => m.membro_uid);
  return [uid, ...membroUids]; // Retorna o uid do dono + os dos membros
}


const listarProdutosComVencendo = async (req, res) => {
  try {
    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({ error: "UID do usuário é obrigatório." });
    }

    const uidsParaBuscar = await buscarUidsUsuarioEMembros(uid);

    const hoje = new Date();
    const limite = new Date();
    limite.setDate(hoje.getDate() + 30);

    const { data: todos } = await supabase
      .from('produtos')
      .select('*, tipos (nome)')
      .in('restaurante_id', uidsParaBuscar);

    const { data: vencendo } = await supabase
      .from('produtos')
      .select('*, tipos (nome)')
      .in('restaurante_id', uidsParaBuscar)
      .lte('validade', limite.toISOString());

    res.json({ todos, vencendo });
  } catch (err) {
    console.error('Erro listarProdutosComVencendo:', err.message);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};



const listarProdutosVencendoPorPeriodo = async (req, res) => {
  try {
    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({ error: "UID do usuário é obrigatório." });
    }

    const uidsParaBuscar = await buscarUidsUsuarioEMembros(uid);

    const hoje = new Date();
    const limite7 = new Date(hoje);
    limite7.setDate(hoje.getDate() + 7);
    const limite15 = new Date(hoje);
    limite15.setDate(hoje.getDate() + 15);
    const limite30 = new Date(hoje);
    limite30.setDate(hoje.getDate() + 30);

    const vencendo7 = await supabase
      .from('produtos')
      .select('*')
      .lte('validade', limite7.toISOString())
      .in('restaurante_id', uidsParaBuscar);

    const vencendo15 = await supabase
      .from('produtos')
      .select('*')
      .lte('validade', limite15.toISOString())
      .gt('validade', limite7.toISOString())
      .in('restaurante_id', uidsParaBuscar);

    const vencendo30 = await supabase
      .from('produtos')
      .select('*')
      .lte('validade', limite30.toISOString())
      .gt('validade', limite15.toISOString())
      .in('restaurante_id', uidsParaBuscar);

    res.json({
      vencendo7: vencendo7.data.length,
      vencendo15: vencendo15.data.length,
      vencendo30: vencendo30.data.length
    });
  } catch (err) {
    console.error('Erro em listarProdutosVencendoPorPeriodo:', err.message);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};



const listarQuantidadePorTipo = async (req, res) => {
  try {
    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({ error: "UID do usuário é obrigatório." });
    }

    const uidsParaBuscar = await buscarUidsUsuarioEMembros(uid);

    const { data, error } = await supabase
      .from('produtos')
      .select('*, tipos (nome), quantidade')
      .in('restaurante_id', uidsParaBuscar);

    if (error) {
      return res.status(500).json({ erro: error.message });
    }

    const agrupado = {};

    data.forEach(({ tipos, quantidade }) => {
      const nomeTipo = tipos?.nome || 'Desconhecido';
      if (!agrupado[nomeTipo]) {
        agrupado[nomeTipo] = 0;
      }
      agrupado[nomeTipo] += quantidade;
    });

    res.json(agrupado);
  } catch (err) {
    console.error('Erro listarQuantidadePorTipo:', err.message);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};


const cadastrarProduto = async (req, res) => {
  try {
    const { nome, preco, validade, peso_total_gramas, quantidade, tipos, restaurante_id } = req.body;


    if (!restaurante_id) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const { error } = await supabase.from("produtos").insert([
      {
        nome,
        preco,
        validade,
        peso_total_gramas,
        quantidade,
        tipos,
        restaurante_id,
      },
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: "Produto cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

const buscarTipos = async (req, res) => {
  try {
    const { data, error } = await supabase.from('tipos_produtos').select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar tipos:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const deletarProduto = async (req, res) => {
  try {
    const { id } = req.body; // Pega o id do corpo da requisição

    if (!id) {
      return res.status(400).json({ error: "ID do produto é obrigatório." });
    }

    const { error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Produto deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};







// Exporta as duas funções
module.exports = {
  listarProdutosVencendoPorPeriodo,
  listarProdutosDoUsuarioESeusMembros,
  listarProdutosComVencendo,
  listarQuantidadePorTipo,
  cadastrarProduto,
  buscarTipos,
  deletarProduto
};

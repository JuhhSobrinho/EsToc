// usersController.js
const supabase = require('../config/db');

const signUpUser = async (req, res) => {
  const { email, senha, nome } = req.body;

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (authError) throw authError;

    const userId = authData.user.id;

    // Agora, adicionando o email na tabela 'users'
    const { error } = await supabase
      .from('users')
      .insert([{ id: userId, nome, email, senha }]);

    if (error) throw error;

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro no cadastro:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, senha } = req.body;


  try {
    // Usando o método correto para autenticação
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    });

    if (authError) throw authError;

    // Caso a autenticação seja bem-sucedida
    res.status(200).json({ message: 'Usuário autenticado com sucesso', user: authData.user });
  } catch (error) {
    console.error('Erro no login:', error.message);
    res.status(401).json({ error: error.message });
  }
};



const adicionarMembro = async (req, res) => {
  const { uid, emailMembro } = req.body;

  // Verifica se uid e emailMembro foram passados
  if (!uid || !emailMembro) {
    return res.status(400).json({ error: 'Faltando uid do usuário ou email do membro' });
  }

  try {
    // Busca o usuário pelo email
    const { data: membro, error: membroError } = await supabase
    .from('users')
    .select('id, email') // <- adicionou o uid
    .eq('email', emailMembro)
    .single();
  
  if (membroError || !membro) {
    return res.status(404).json({ error: 'Usuário com esse email não encontrado' });
  }
  // Adicionei um log para verificar o membro encontrado

  const { error } = await supabase
    .from('membros')
    .insert([
      {
        dono_uid: uid,
        membro_uid: membro.id, 
        membro_email: membro.email,
      }
    ]);
  

    if (error) {
      return res.status(500).json({ error: 'Erro ao adicionar membro', detalhes: error.message });
    }

    res.status(201).json({ message: 'Membro adicionado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor', detalhes: error.message });
  }
};

const removerMembro = async (req, res) => {
  const { uid, emailRm } = req.body;

  // Verifica se uid e emailMembro foram passados
  if (!uid || !emailRm) {
    return res.status(400).json({ error: 'Faltando uid do usuário ou email do membro' });
  }

  try {
    // Busca o membro pelo email
    const { data: membro, error: membroError } = await supabase
      .from('users')
      .select('id, email') // Verificando o ID e email do membro
      .eq('email', emailRm)
      .single();

    if (membroError || !membro) {
      return res.status(404).json({ error: 'Usuário com esse email não encontrado' });
    }

    // Deleta o membro da tabela "membros"
    const { error } = await supabase
      .from('membros')
      .delete()
      .eq('dono_uid', uid)  // Remover o membro baseado no dono
      .eq('membro_uid', membro.id); // Verificando o ID do membro para removê-lo

    if (error) {
      return res.status(500).json({ error: 'Erro ao remover membro', detalhes: error.message });
    }

    res.status(200).json({ message: 'Membro removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor', detalhes: error.message });
  }
};


const listarMembros = async (req, res) => {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ error: 'Faltando uid do dono para listar membros' });
  }

  try {
    const { data: membros, error } = await supabase
      .from('membros')
      .select('membro_uid, membro_email') // Pegamos só o que interessa
      .eq('dono_uid', uid);

    if (error) {
      return res.status(500).json({ error: 'Erro ao buscar membros', detalhes: error.message });
    }

    res.status(200).json(membros);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor', detalhes: error.message });
  }
};



module.exports = {
  signUpUser,
  loginUser,
  adicionarMembro,
  listarMembros,
  removerMembro
};

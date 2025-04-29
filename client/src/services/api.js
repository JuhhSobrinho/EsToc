const API_URL = 'http://estoc-production.up.railway.app';
import md5 from "md5";
const uid = localStorage.getItem('uid');

export const getProdutosSeparados = async () => {
  try {
    // 1. Requisição para todos os produtos
    const [todosRes, vencendoRes, periodoRes, quantidadeRes, tiposRes] = await Promise.all([
      fetch(`${API_URL}/produtos/?uid=${uid}`),
      fetch(`${API_URL}/produtos/todos-com-vencendo?uid=${uid}`),
      fetch(`${API_URL}/produtos/todos-periodo-vencimento?uid=${uid}`),
      fetch(`${API_URL}/produtos/quantidade-por-tipo?uid=${uid}`),
      fetch(`${API_URL}/produtos/tipos-de-produto?uid=${uid}`)
    ]);

    // Verifica se alguma deu erro
    if (!todosRes.ok || !vencendoRes.ok || !periodoRes.ok || !quantidadeRes.ok || !tiposRes.ok) {
      throw new Error('Erro ao buscar dados dos produtos');
    }

    // Pega os dados de cada uma
    const todos = await todosRes.json();
    const vencendo = await vencendoRes.json(); // { todos, vencendo }
    const vencimentoPorPeriodo = await periodoRes.json(); // { vencendo7, vencendo15, vencendo30 }
    const quantidadePorTipo = await quantidadeRes.json();
    const tiposDeProdutos = await tiposRes.json();

    return {
      todos,
      vencendo: vencendo.vencendo,
      vencendoPorPeriodo: vencimentoPorPeriodo,
      quantidadePorTipo: quantidadePorTipo,
      tiposDeProdutos: tiposDeProdutos
    };
  } catch (error) {
    console.error('Erro ao buscar produtos separados:', error);
    throw error;
  }
};

export const cadastrarProduto = async (produtoData) => {
  try {
    const response = await fetch(`${API_URL}/produtos/cadastro-de-produtos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produtoData)
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Erro detalhado do backend:", err);
      throw new Error(err.error || 'Erro ao cadastrar produto');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    throw error;
  }
};





export const cadastrarUsuario = async (formData) => {
  try {
    console.log(formData);
    
    const response = await fetch(`${API_URL}/users/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Erro ao cadastrar');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro no cadastro:', error);
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Erro ao fazer login');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};


export const adicionarMembro = async (emailMembro) => {
  try {
    const response = await fetch(`${API_URL}/users/adicionar-membro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, emailMembro }),
    });
    if (!response.ok) {
      const err = await response.json();
      console.error("Erro detalhado do backend:", err);
      throw new Error(err.error || 'Erro ao adicionar membro');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao adicionar membro:', error);
    throw error;
  }
};


export const removerMembro = async (emailRm) => {
  try {
    const response = await fetch(`${API_URL}/users/remove-membros`, {
      method: 'DELETE',  // Método DELETE para remover
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, emailRm }), // Enviando o uid e email do membro
    });
    console.log("apiRM",{ uid, emailRm });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Erro ao remover membro');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao remover membro:', error);
    throw error;
  }
};



export const listarMembros = async () => {
  try {
    const response = await fetch(`${API_URL}/users/listar-membros?uid=${uid}`); // usando o uid que já pega do localStorage

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Erro ao listar membros');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao listar membros:', error);
    throw error;
  }
};

export const deletarProduto = async (id) => {
  console.log("deletarProduto", id);	
  
  try {
    const response = await fetch(`${API_URL}/produtos/deletar-produto`, {
      method: 'DELETE',  // Método DELETE
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // Enviando o id no corpo da requisição
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Erro ao remover Produto');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao remover Produto:', error);
    throw error;
  }
};


export function getGravatarUrl(email, size = 200) {
  if (!email) return ""; // Evita erro
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

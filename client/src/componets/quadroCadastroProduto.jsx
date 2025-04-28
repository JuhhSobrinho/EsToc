import { useState, useEffect } from "react";
import { cadastrarProduto, getProdutosSeparados } from "../services/api";
import { toast, Toaster } from "sonner";
import "../App.css";

export function CadastroProduto() {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    validade: "",
    peso_total_gramas: "",
    quantidade: "",
    tipos: "",
  });

  useEffect(() => {
    async function carregarTipos() {
      try {
        const { tiposDeProdutos } = await getProdutosSeparados();
        setTipos(tiposDeProdutos);
      } catch (error) {
        console.error("Erro ao buscar tipos:", error);
      }
    }
    carregarTipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurante_id = localStorage.getItem("uid");

    if (!restaurante_id) {
      toast.error("Usuário não autenticado."); // agora usando toast aqui
      return;
    }

    const produtoComrestaurante_id = { ...form, restaurante_id };

    try {
      await cadastrarProduto(produtoComrestaurante_id);
      toast.success("Produto cadastrado com sucesso!", {
        duration: 3000,
        position: "top-right",
        style: {
          backgroundColor: "var(--main-secun-color)",
          color: "var(--main-text-color)",
        },
      });
      setForm({
        nome: "",
        preco: "",
        validade: "",
        peso_total_gramas: "",
        quantidade: "",
        tipos: "",
      });
    } catch (err) {
      toast.error(`Erro: ${err.message}`, {
        duration: 3000,
        position: "top-right",
        style: {
          backgroundColor: "var(--main-secun-color)",
          color: "var(--main-text-color)",
        },
      });
    }
  };

  return (
    <div className="form-container" style={{ width: "100%" }}>
      <Toaster richColors position="top-right" />
      <section
        className="form-login"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <h2 className="titulo-login">Cadastrar Produto</h2>
        <form onSubmit={handleSubmit}>
          <section className="dados">
            <input
              className="input-dados"
              name="nome"
              type="text"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
            <input
              className="input-dados"
              name="preco"
              type="number"
              placeholder="Preço"
              value={form.preco}
              onChange={handleChange}
              required
            />
            <input
              className="input-dados"
              name="validade"
              type="date"
              value={form.validade}
              onChange={handleChange}
              required
            />
            <input
              className="input-dados"
              name="peso_total_gramas"
              type="number"
              placeholder="Peso (g)"
              value={form.peso_total_gramas}
              onChange={handleChange}
              required
            />
            <input
              className="input-dados"
              name="quantidade"
              type="number"
              placeholder="Quantidade"
              value={form.quantidade}
              onChange={handleChange}
              required
            />
          </section>
          <select
            className="input-dados"
            name="tipos"
            value={form.tipos}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o tipo</option>
            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </option>
            ))}
          </select>

          <button type="submit">Cadastrar</button>
        </form>

        <section className="titulos-planilha-quadro">
          <span className="titulo-Quadros"> Nome do Produto</span>
          <span className="titulo-Quadros"> Preço</span>
          <span className="titulo-Quadros"> Validade</span>
          <span className="titulo-Quadros"> Gramas.g</span>
          <span className="titulo-Quadros"> Quanti</span>
          <span className="titulo-Quadros"> Tipo</span>
        </section>
        <div className="line-quadro"></div>

        <section className="titulos-planilha-quadro">
          <span className="titulo-Quadros">{form.nome}</span>
          <span className="titulo-Quadros">R${form.preco}</span>
          <span className="titulo-Quadros">{form.validade}</span>
          <span className="titulo-Quadros">{form.peso_total_gramas}g</span>
          <span className="titulo-Quadros">{form.quantidade}</span>
          <span className="titulo-Quadros">{form.tipos}</span>
        </section>
      </section>
    </div>
  );
}

export default CadastroProduto;

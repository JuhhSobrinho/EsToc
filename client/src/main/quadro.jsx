import "../style/global.css";
import { useState, useEffect } from "react";
import SplashScreen from "../splash";
import { getProdutosSeparados, deletarProduto } from "../services/api";
import { CharVenvimento } from "../componets/chartComponent";
import { ChartTipo } from "../componets/chartTipo";
import { CadastroProduto } from "../componets/quadroCadastroProduto";
import { QuadroUsuario } from "../componets/quadroUsuario";
import { ChartAddGrupo } from "../componets/chartAddGrupo";
import { lightTheme, darkTheme } from "../style/theme";
import { toast, Toaster } from "sonner";

const savedTheme = localStorage.getItem("theme") || "dark";

export function Quadro({ quadroId }) {
  const [isChecked, setIsChecked] = useState(savedTheme);
  const [produtos, setProdutos] = useState([]);
  const [produtosVencendo, setProdutosVencendo] = useState([]);
  const [graficoDataVenc, setgraficoDataVenc] = useState([]);
  const [graficoDataTipo, setgraficoDataTipo] = useState([]);

  const [selectedQuadroTipo, setSelectedQuadroTipo] = useState(null);
  const [selectedQuadroVenc, setSelectedQuadroVenc] = useState(null);
  const [selectedQuadroProd, setSelectedQuadroProd] = useState(null);

  const [termoBusca, setTermoBusca] = useState("");

  const themeStyles = isChecked ? lightTheme : darkTheme;
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (savedTheme === "dark") {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
    console.log("quadroId", quadroId);

    if (quadroId === 1 || quadroId === 6) {
      setSelectedQuadroTipo({
        transition: "1s",
        width: "75%",
        height: "600px",
      });
      setSelectedQuadroVenc({
        transition: "1s",
        width: "300px",
        height: "150px",
      });
      setSelectedQuadroProd({ transition: "1s", height: "150px" });
    } else if (quadroId === 2 || quadroId === 5) {
      setSelectedQuadroTipo({
        transition: "1s",
        width: "300px",
        height: "150px",
      });
      setSelectedQuadroVenc({
        transition: "1s",
        width: "300px",
        height: "150px",
      });
      setSelectedQuadroProd({ transition: "1s", height: "600px" });
    } else if (quadroId === 3 || quadroId === 4) {
      setSelectedQuadroTipo({
        transition: "1s",
        width: "300px",
        height: "150px",
      });
      setSelectedQuadroVenc({
        transition: "1s",
        width: "75%",
        height: "600px",
      });
      setSelectedQuadroProd({ transition: "1s", height: "150px" });
    }
  }, [quadroId]);

  const handleRemoverProduto = async (idProduto) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja remover este produto?"
    );

    if (!confirmar) {
      return; // Não faz nada se o usuário cancelar
    }

    try {
      await deletarProduto(idProduto); // Espera a exclusão ser concluída
      toast.success("Produto removido com sucesso!", {
        duration: 3000,
        position: "top-right",
        style: {
          backgroundColor: "var(--main-secun-color)",
          color: "var(--main-text-color)",
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(`Erro ao remover: ${error.message}`, {
        duration: 3000,
        position: "top-right",
        style: {
          backgroundColor: "var(--main-secun-color)",
          color: "var(--main-text-color)",
        },
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProdutosSeparados();
        setProdutos(data.todos);
        setProdutosVencendo(data.vencendo);
        setgraficoDataVenc(data.vencendoPorPeriodo);
        setgraficoDataTipo(data.quantidadePorTipo);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    fetchData();
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );
  

  return (
    <>
      <SplashScreen />
      <main className="App" style={themeStyles}>
        <section className="quadro-status">
          <section className="pesquisa-quadro">
            <input
              className="titulo-pesquisa"
              type="text"
              placeholder="Pesquisar"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </section>
          <section className="grafico-validade">
            <div
              className="quadro-grafico"
              id="quadro-grafico-tipo"
              style={selectedQuadroTipo}
            >
              <div className="card-post" id="novo-card-post">
                {quadroId === 6 ? (
                  <CadastroProduto />
                ) : (
                  <ChartTipo data={graficoDataTipo} />
                )}
              </div>
            </div>
            <div
              className="quadro-grafico"
              id="quadro-grafico-validade"
              style={selectedQuadroVenc}
            >
              <div className="card-post" id="novo-card-post">
                {quadroId === 4 ? (
                  <QuadroUsuario email={email} />
                ) : (
                  <CharVenvimento data={graficoDataVenc} />
                )}
              </div>
            </div>
          </section>

          {quadroId === 5 ? (
            <ChartAddGrupo />
          ) : (
            <section
              className="quadro-posts"
              id="add-quadro-post"
              style={selectedQuadroProd}
            >
              <section className="titulos-planilha-quadro">
                <span className="titulo-Quadros"> Nome do Produto</span>
                <span className="titulo-Quadros"> Preço</span>
                <span className="titulo-Quadros"> Validade</span>
                <span className="titulo-Quadros"> Gramas.g</span>
                <span className="titulo-Quadros"> Quanti</span>
                <span className="titulo-Quadros"> Tipo</span>
                <span className="titulo-Quadros"> Btn-Remover</span>
              </section>
              <div className="line-quadro"></div>
              {produtosFiltrados.map((produto) => (
                <section className="titulos-planilha-quadro" key={produto.id}>
                  <span className="titulo-Quadros">{produto.nome}</span>
                  <span className="titulo-Quadros">R${produto.preco}</span>
                  <span className="titulo-Quadros">{produto.validade}</span>
                  <span className="titulo-Quadros">
                    {produto.peso_total_gramas}g
                  </span>
                  <span className="titulo-Quadros">{produto.quantidade}</span>
                  <span className="titulo-Quadros">{produto.tipos?.nome}</span>
                  <button
                    className="titulo-Quadros"
                    key={"btn-" + produto.id}
                    onClick={() => handleRemoverProduto(produto.id)}
                  >
                    Remover
                  </button>
                </section>
              ))}
            </section>
          )}
        </section>
      </main>
    </>
  );
}

export default Quadro;

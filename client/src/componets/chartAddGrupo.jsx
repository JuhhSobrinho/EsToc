import { useState, useEffect } from "react";
import { adicionarMembro, listarMembros, removerMembro } from "../services/api";
import "../App.css";
import { toast, Toaster } from "sonner";


export function ChartAddGrupo() {
  const [emailMembro, setEmailMembro] = useState("");
  const [membros, setMembros] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await adicionarMembro(emailMembro);
      toast.success("Membro cadastrado com sucesso!", {
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

  const handleRemoverMembro = async (emailRm) => {
    try {
      console.log(emailRm);

      removerMembro(emailRm);
      toast.success("Membro removido com sucesso!", {
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
      toast.success(`Erro ao remover: ${error}`, {
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
    const fetchMembros = async () => {
      try {
        const membros = await listarMembros();
        setMembros(membros);
        console.log(membros); // Aqui você pode setar no seu estado também
      } catch (error) {
        console.error("Erro buscando membros:", error);
      }
    };

    fetchMembros();
  }, []);

  return (
    <div
      className="form-container"
      style={{ width: "90%", height: "70%", marginTop: "10px" }}
    >
      <section
        className="form-login"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <form onSubmit={handleSubmit}>
          <section className="dados">
            <h2 className="titulo-login">Adicionar Membro ao Grupo</h2>
            <input
              style={{ textAlign: "center" }}
              className="input-dados"
              name="Email"
              type="email" // Corrigido de number para email
              placeholder="Email"
              onChange={(e) => setEmailMembro(e.target.value.trim())} // Corrigido para atualizar o estado
              required
            />
          </section>

          <button type="submit">Adicionar Membro</button>
        </form>
        <div className="table-membros">
          <section className="listar-membros">
            <span className="titulo-Quadros"> Email</span>
            <span className="titulo-Quadros"> UID</span>
            <span className="titulo-Quadros"> Btn-Remover</span>
          </section>
          {membros.map((mb) => (
            <>
              <div
                className="line-quadro"
                key={mb.membro_uid.substring(0, 13)}
              ></div>
              <section className="listar-membros">
                <span className="titulo-Quadros"> {mb.membro_email}</span>
                <span className="titulo-Quadros">
                  {" "}
                  {mb.membro_uid.substring(0, 13)}
                </span>
                <button
                  className="titulo-Quadros"
                  key={"btn-" + mb.membro_uid.substring(0, 13)}
                  onClick={() => handleRemoverMembro(mb.membro_email)}
                >
                  Remover
                </button>
              </section>
            </>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ChartAddGrupo;

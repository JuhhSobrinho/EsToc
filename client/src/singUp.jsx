import "./App.css";
import { useState, useEffect } from "react";
import SplashScreen from "./splash";
import { Link, useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "./services/api";
import { toast, Toaster } from "sonner";

import { lightTheme, darkTheme } from "./style/theme";

import ThemeToggle from "./componets/ThemeToggle";

const savedTheme = localStorage.getItem("theme") || "dark";

function SingUp() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);

  const themeStyles = isChecked ? lightTheme : darkTheme;

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  // Função que lida com as mudanças no formulário
  const handleChange = (e) => {
    setFormData({
      ...formData, // mantém os dados existentes
      [e.target.name]: e.target.value, // atualiza o campo específico
    });
  };

  // Função que lida com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita o envio padrão
    try {
      await cadastrarUsuario(formData); // envia os dados para o backend
      toast.error(`Cadastro realizado com sucesso!`, {
        duration: 3000,
        position: "top-right",
        style: {
          backgroundColor: "var(--main-secun-color)",
          color: "var(--main-text-color)",
        },
      });
      navigate("/Login"); // redireciona para o login após o cadastro
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

  useEffect(() => {
    if (savedTheme === "dark") {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  }, []);


  return (
    <>
      <SplashScreen />
      <Toaster richColors position="top-right" />{}
      <main className="App" style={themeStyles}>
        <section className="form-login">
          <div>
            <lord-icon
              src="https://cdn.lordicon.com/pcllgpqm.json"
              trigger="loop"
              delay="2000"
              colors="primary:#121331,secondary:#21212d,tertiary:#645fc6"
              style={{ width: "250px", height: "200px" }}
            ></lord-icon>
          </div>
          <h1 className="titulo-login">SingUp</h1>
          <section className="dados">
            <input
              className="input-dados"
              type="text"
              placeholder="Nome"
              name="nome" // adiciona o nome para o campo
              value={formData.nome}
              onChange={handleChange}
              required
            />
            <input
              className="input-dados"
              type="email"
              placeholder="E-mail"
              name="email" // adiciona o nome para o campo
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="input-dados"
              type="password"
              placeholder="Senha: Ex *******"
              name="senha" // adiciona o nome para o campo
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </section>
          <span>
            <Link to="/Login" className="btn-mudar-tela">
              Já tem Cadastro? Entre!
            </Link>
          </span>
          <div className="card">
            <ThemeToggle />
            <button className="btn-logar" type="submit" onClick={handleSubmit}>
              Cadastrar
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default SingUp;

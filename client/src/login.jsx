import "./App.css";
import { useState, useEffect } from "react";
import SplashScreen from "./splash";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./componets/ThemeToggle";
import { loginUser } from './services/api';
import { toast, Toaster } from "sonner";


import { lightTheme, darkTheme } from "./style/theme";

const savedTheme = localStorage.getItem("theme") || "dark";

function Login() {
  const [isChecked, setIsChecked] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', senha: '' });

  const themeStyles = isChecked ? lightTheme : darkTheme;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem('uid', response.user.id);
      localStorage.setItem('email', response.user.email);
      
      toast.error(` ${response.message}`, {
        duration: 3000,
        position: "top-right",
        style: {
          backgroundColor: "var(--main-secun-color)",
          color: "var(--main-text-color)",
        },
      });
      navigate('/dashboard'); // Substitua com sua página de destino
    } catch (err) {
      if (err.message && err.message.includes(`Email not confirmed`)) {
        toast.error(`Confirme Primeiro o email em sua caixa de entrada ou spam`, {
          duration: 3000,
          position: "top-right",
          style: {
            backgroundColor: "var(--main-secun-color)",
            color: "var(--main-text-color)",
          },
        });
      }else {      
        toast.error(`Erro ao Fazer o Login: ${err.message}`, {
        duration: 3000,
        position: "top-right",
        style: {
          backgroundColor: "var(--main-secun-color)",
          color: "var(--main-text-color)",
        },
      });
    }
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
      <Toaster richColors position="top-right" />
      <main className="App" style={themeStyles}>
        <section className="form-login">
          <h1 className="titulo-login">Login</h1>
          <section className="dados">
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
            <Link to="/SingUp" className="btn-mudar-tela">
              Não tem Cadastro? Cadastre-se!!
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

export default Login;

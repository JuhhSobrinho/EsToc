import { useState, useEffect } from "react";
import Quadro from "./quadro";
import ThemeToggle from "../componets/ThemeToggle";
import grafic from "../assets/grafic.svg";
import box from "../assets/box.svg";
import validade from "../assets/validade.svg";
import user from "../assets/user.svg";
import add from "../assets/add.svg";
import userAddPlus from "../assets/userAddPlus.svg";
import { Toaster } from "sonner";

import { lightTheme, darkTheme } from "../style/theme";


const savedTheme = localStorage.getItem("theme") || "dark";

function Dashboard() {
  const [quadroID, setQuadroID] = useState(0);
  const [isChecked, setIsChecked] = useState(true);

  const themeStyles = isChecked ? lightTheme : darkTheme;

  useEffect(() => {
    if (savedTheme === "dark") {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  }, []);


  const handleIdQuadro = (id) => {
    setQuadroID(id);
  }


  return (
    <>
    <Toaster richColors position="top-right" />
      <main className="App" style={themeStyles}>
        <nav className="menu-lateral-projects">
          <div className="titulo-coleçoes">
            <section className="coleções-projects">
              <button
                className="quadro-selecionado"
                onClick={() => handleIdQuadro(1)}
              >
                <img className="icons-menu" src={grafic} alt="grafico" />
              </button>
              <button
                className="quadro-selecionado"
                onClick={() => handleIdQuadro(2)}
              >
                <img className="icons-menu" src={box} alt="grafico" />
              </button>
              <button
                className="quadro-selecionado"
                onClick={() => handleIdQuadro(3)}
              >
                <img className="icons-menu" src={validade} alt="grafico" />
              </button>
              <button
                className="quadro-selecionado"
                onClick={() => handleIdQuadro(4)}
              >
                <img className="icons-menu" src={user} alt="grafico" />
              </button>
              <button
                className="quadro-selecionado"
                onClick={() => handleIdQuadro(5)}
              >
                <img className="icons-menu" src={userAddPlus} alt="grafico" />
              </button>
              <button
                className="quadro-selecionado"
                onClick={() => handleIdQuadro(6)}
              >
                <img className="icons-menu" src={add} alt="grafico" />
              </button>
              

              
            </section>
          </div>
          <ThemeToggle />
        </nav>
        <Quadro quadroId={quadroID} />
      </main>
    </>
  );
}

export default Dashboard;

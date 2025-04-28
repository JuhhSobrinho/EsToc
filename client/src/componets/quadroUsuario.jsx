import "../style/global.css";
import React from "react";
import { getGravatarUrl } from "../services/api";

export function QuadroUsuario({ email }) {
  const gravatarUrl = getGravatarUrl(email);
  console.log(email);
  

  return (
    <div className="main-usuario">
      <div className="quadro-usuario">
        <div className="perfil">
          <img src={gravatarUrl} alt="Foto de perfil" className="foto-perfil" />
          <span className="titulo-Quadros">{email}</span>
        </div>
        <section className="bottons">
          <a href="https://juhhsobrinho.github.io/Portfolio/">
            <button type="button" className="btn-user">
              <span className="nomeDoPosto">Sobre o Dev</span>
              <div className="line-user"></div>
            </button>
          </a>
          <button type="button" className="btn-user">
            <span className="txt-sair">Sair</span>
          </button>
          <button type="button" style={{ backgroundColor: "#FF0000" } } onClick={() => { if (window.confirm("Você tem certeza que deseja deletar sua conta?")) { /* Lógica para deletar a conta */ } } } className="btn-user">
            <span className="txt-sair">Deletar</span>
          </button>
        </section>
      </div>
      <p className="txt-usuario" style={{  color: "#6F7482" }}>
        Olá, <span className="titulo-Quadros">{email}</span>!<br /> Aqui estão
        suas informações. <br /> Você pode sair ou deletar sua conta.<br /> Para
        mais informações ou tirar duvidas com o dev, <br /> clique no botão "Sobre o Dev".<br /> <br />
        Muito Obrigado por testar e utilizar nosso Software de Estoque, <br/> com o tempo iremos atualizar e melhora-lo.<br /> <br />
        <span className="txt-sair">Use e abuse - Aproveite!</span>
      </p>
    </div>
  );
}

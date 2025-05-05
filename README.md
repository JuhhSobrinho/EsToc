# 📦 Sistema de Controle de Estoque

Este projeto é um sistema web para controle de estoque, desenvolvido como parte de um projeto acadêmico. Ele permite o gerenciamento de produtos, com funcionalidades como cadastro, listagem, edição e exclusão de itens.

## 🚀 Funcionalidades

- Cadastro de produtos com nome, quantidade, categoria, descrição e preço
- Listagem de produtos em tempo real
- Edição e exclusão de produtos
- Busca por nome ou ID
- Integração com banco de dados SQL via Supabase
- Interface amigável, responsiva e com tema moderno
- Sistema de autenticação (login/logout)

## 🛠️ Tecnologias Utilizadas

### Front-end
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Heroicons](https://heroicons.com/) e [Lordicon](https://lordicon.com/)

### Back-end
- [Supabase](https://supabase.com/) (banco de dados e autenticação)

### Outros
- Firebase (se aplicável para autenticação)
- Figma e Photoshop para o design
- Coolors para escolha de paleta de cores

## 📂 Estrutura do Projeto

```bash
📦 projeto/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
├── backend/
│   └── config/
│       └── db.js
├── README.md
└── package.json

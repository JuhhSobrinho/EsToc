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
- [Railway].(https://railway.com/project/4ba1ecbf-d623-4222-a832-7e45db7da8d6/service/c9121cdc-656a-416a-b687-511832909338?environmentId=8c738e6b-148d-4349-bf0e-8571913d4b0f). (servidor Banco de dados)

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

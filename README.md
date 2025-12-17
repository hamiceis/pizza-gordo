# 🍕 Pizza do Gordo - Frontend

Bem-vindo ao repositório do frontend da **Pizza do Gordo**. Esta aplicação é uma plataforma moderna e responsiva de pedidos online, construída com as melhores práticas de desenvolvimento web e arquitetura escalável.

![Status do Projeto](https://img.shields.io/badge/status-ativo-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Tecnologias e Ferramentas

Utilizamos um stack moderno focado em performance, acessibilidade, tipagem estática e experiência do desenvolvedor:

### Core & Build

- **[React 19](https://react.dev/)**: Biblioteca principal para construção de interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset JavaScript para tipagem estática robusta.
- **[Vite](https://vitejs.dev/)**: Build tool e servidor de desenvolvimento ultra-rápido.

### UI & Estilização

- **[Tailwind CSS v3](https://tailwindcss.com/)**: Framework utility-first para estilização rápida.
- **[Shadcn UI](https://ui.shadcn.com/)**: Componentes acessíveis e customizáveis construídos sobre Radix UI.
- **[Radix UI](https://www.radix-ui.com/)**: Primitivos de UI acessíveis e sem estilo.
- **[Lucide React](https://lucide.dev/)**: Biblioteca de ícones leve e consistente.
- **[Sonner](https://sonner.emilkowal.ski/)**: Componente de toast (notificações) opinativo e bonito.

### Gerenciamento de Estado & Dados

- **[Zustand](https://github.com/pmndrs/zustand)**: Gerenciamento de estado global simples e leve (carrinho).
- **[TanStack Router](https://tanstack.com/router)**: Roteamento type-safe para React.

### Formulários & Validação

- **[React Hook Form](https://react-hook-form.com/)**: Gerenciamento de formulários performático e flexível.
- **[Zod](https://zod.dev/)**: Validação de esquemas e inferência de tipos (TypeScript-first).

### SEO & Performance

- **[React Helmet Async](https://github.com/staylor/react-helmet-async)**: Gerenciamento dinâmico de meta tags e títulos para SEO.

## 📂 Estrutura do Projeto

A arquitetura de pastas foi desenhada para manter a organização e escalabilidade:

```bash
src/
├── components/         # Componentes React
│   ├── ui/             # Componentes Shadcn/UI (Button, Input, Select, etc.)
│   ├── CartDrawer.tsx  # Drawer do carrinho lateral
│   ├── Navbar.tsx      # Navegação principal
│   └── ...
├── data/               # Mock data (Produtos, Depoimentos)
├── lib/                # Utilitários (ex: cn merge)
├── pages/              # Páginas da aplicação (HomePage, CartPage)
├── routes/             # Definição de rotas
├── store/              # Stores do Zustand (cartStore)
├── types.ts            # Definições de tipos globais (Schemas Zod exportados)
├── router.tsx          # Configuração do Router
└── main.tsx            # Entry point com HelmetProvider
```

## ✨ Funcionalidades

- **Catálogo Interativo**:
  - Filtros por categoria (Pizzas, Combos, Bebidas, etc.).
  - Busca em tempo real por nome ou descrição.
- **Carrinho de Compras**:
  - Adição/Remoção de itens com cálculo automático de totais.
  - Persistência local do carrinho.
- **Checkout Inteligente**:
  - Formulário validado com **Zod** e **React Hook Form**.
  - Opção de **Entrega** (com endereço condicional) ou **Retirada**.
  - Geração automática de pedido formatado para o **WhatsApp**.
- **SEO Otimizado**:
  - Meta tags dinâmicas por página (Título, Descrição).
  - Open Graph tags para compartilhamento social.
- **UI/UX Refinada**:
  - Design totalmente responsivo (Mobile First).
  - Animações suaves e feedback visual instantâneo.
  - Tema visual consistente (Cores da marca).

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (v18+)
- npm ou yarn

### Passos

1. **Clone o repositório**

   ```bash
   git clone https://github.com/hamiceis/pizza-gordo.git
   cd pizza-do-gordo
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute o servidor local**

   ```bash
   npm run dev
   ```

4. **Acesse**
   Abra `http://localhost:5173` no seu navegador.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

---

Desenvolvido com 🍕 e ❤️.

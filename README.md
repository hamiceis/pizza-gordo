# 🍕 Pizza do Gordo - Frontend

Bem-vindo ao repositório do frontend da **Pizza do Gordo**. Esta aplicação é uma plataforma moderna e responsiva de pedidos online, construída com as melhores práticas de desenvolvimento web e arquitetura scalável.

![Status do Projeto](https://img.shields.io/badge/status-ativo-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Tecnologias e Ferramentas

Utilizamos um stack moderno focado em performance, tipagem estática e experiência do desenvolvedor:

- **Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS v3](https://tailwindcss.com/) + [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **Roteamento**: [TanStack Router](https://tanstack.com/router) (Type-safe routing)
- **Gerenciamento de Estado**: [Zustand](https://github.com/pmndrs/zustand)
- **Validação de Formulários**: [Zod](https://zod.dev/)
- **UI Components**: [Lucide React](https://lucide.dev/) (Ícones)
- **Notificações**: [Sonner](https://sonner.emilkowal.ski/)

## 📂 Estrutura do Projeto

A arquitetura de pastas foi desenhada para manter a organização e escalabilidade:

```bash
src/
├── components/         # Componentes React reutilizáveis
│   ├── ui/             # Componentes de UI básicos (Atomic Design)
│   ├── CartDrawer.tsx  # Gaveta lateral do carrinho
│   ├── Navbar.tsx      # Barra de navegação responsiva
│   └── ...
├── data/               # Dados estáticos (mock) para produtos e categorias
├── lib/                # Utilitários e helpers (ex: cn function)
├── pages/              # Páginas da aplicação (CartPage, HomePage)
├── routes/             # Definições de rotas do TanStack Router
├── store/              # Gerenciamento de estado global (Zustand)
├── types.ts            # Definições de tipos TypeScript globais
├── router.tsx          # Configuração principal do roteador
└── main.tsx            # Ponto de entrada da aplicação
```

## ✨ Funcionalidades

- **Catálogo de Produtos**: Navegação por categorias (Pizzas, Combos, Bebidas, Sobremesas).
- **Carrinho de Compras**:
  - Adição e remoção de itens.
  - Ajuste de quantidade.
  - Cálculo automático de subtotal e total.
  - Persistência de estado (Zustand).
- **Checkout via WhatsApp**: Integração direta que gera uma mensagem formatada com o pedido para envio ao WhatsApp da pizzaria.
- **Validação de Formulário**: Uso de Zod para garantir que os dados do cliente (Nome, Telefone, Endereço) estejam corretos antes do envio.
- **UI/UX Premium**:
  - Design responsivo (Mobile-first).
  - Animações fluidas.
  - Feedback visual com Toasts (Sonner).
  - Indicador de status (Aberto/Fechado) baseado no horário.

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### Passos

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/pizza-do-gordo.git
   cd pizza-do-gordo
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   Abra seu navegador em `http://localhost:5173`

## 📦 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm run preview`: Visualiza a versão de produção localmente.

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/NovaFeature`)
3. Faça o Commit de suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Faça o Push para a Branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

Desenvolvido com 🍕 por **[Seu Nome / Equipe]**

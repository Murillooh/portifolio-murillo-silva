# 📺 Sistema de Tela-TV & Painel de Gerenciamento

Um sistema moderno e integrado para gestão de locação de motos e atendimento em tempo real, composto por um **Painel Administrativo** completo e uma **Tela de TV (Painel de Chamadas)** atualizada instantaneamente via WebSockets.

---

## 🚀 Funcionalidades Principais

### 📺 Painel da TV (`/tv`)
* **Chamadas em Tempo Real**: Atualização instantânea dos chamados em andamento via WebSocket (`socket.io`).
* **Alerta Sonoro (Beep)**: Campainha sonora disparada remotamente pelo administrador ao chamar/chamar novamente um ticket.
* **Tema Remoto**: Alternância entre Modo Escuro (Dark Mode) e Modo Claro (Light Mode) controlada em tempo real direto pelo painel de controle administrativo.
* **Layout Adaptável**: Visual otimizado para TVs e monitores grandes, exibindo informações legíveis sobre a moto (placa, modelo), o locatário e o local de atendimento.

### 🛡️ Painel Administrativo (`/admin`)
* **Dashboard Completo**: Métricas da frota de motos (total, disponíveis, alugadas), estatísticas de chamados por status (aberto, em atendimento, concluído, cancelado) e gráficos de distribuição.
* **Gestão de Locatários**: Cadastro e gerenciamento completo dos clientes/locatários ativos.
* **Gestão de Franqueados**: Cadastro e controle de franqueados e suas respectivas unidades.
* **Gestão da Frota (Motos)**: Controle de motocicletas cadastradas, associando-as ao franqueado responsável e ao locatário ativo.
* **Fila de Tickets (Atendimento)**: Abertura, andamento, e conclusão de tickets de serviço (como Retiradas, Devoluções e Manutenção).
* **Controle Remoto da TV**: Interface dedicada para chamar senhas, disparar o beep sonoro e alternar o tema das TVs conectadas.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend** (Pasta `/client`)
* [React 19](https://react.dev/) - Biblioteca base para a interface de usuário.
* [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para maior segurança no código.
* [Vite](https://vite.dev/) - Tooling ultrarrápido para desenvolvimento frontend.
* [React Router 7](https://reactrouter.com/) - Gerenciamento de rotas e navegação SPA.
* [Socket.io-client](https://socket.io/docs/v4/client-api/) - Comunicação WebSocket com o servidor.

### **Backend** (Pasta `/server`)
* [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/) - API REST estruturada.
* [Socket.io](https://socket.io/) - Servidor WebSocket para sincronização bidirecional em tempo real.
* [PostgreSQL](https://www.postgresql.org/) (com suporte nativo a Supabase, Neon e Render) - Banco de dados relacional de produção.
* [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - Autenticação e hash de senhas seguros.
* [TypeScript](https://www.typescriptlang.org/) & [tsx](https://github.com/privatenumber/tsx) - Ambiente de execução TypeScript dinâmico.

---

## ⚙️ Configuração do Ambiente

### 1. Banco de Dados (Supabase ou PostgreSQL Local)
1. Crie uma base de dados no **Supabase** (ou seu provedor PostgreSQL preferido).
2. Execute o script contido em [server/schema.sql](file:///c:/Users/Murillo%20Silva/Documents/Projeto%20Sistema%20de%20Tela-Tv/server/schema.sql) para criar as tabelas necessárias:
   * `locatarios`
   * `franqueados`
   * `motos`
   * `tickets`
   * `usuarios`

### 2. Configurando as Variáveis de Ambiente do Servidor
Copie o arquivo `.env.example` para `.env` dentro da pasta `server/` e ajuste as variáveis:
```env
PORT=3001
DATABASE_URL=postgresql://seu_usuario:sua_senha@seu_host:5432/seu_banco?sslmode=require
```

---

## 🏃 Como Executar o Projeto

Certifique-se de ter o **Node.js** instalado na sua máquina.

### Executando o Servidor (Backend)
1. Abra um terminal na pasta `server/`:
   ```bash
   cd server
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   *O servidor iniciará por padrão em `http://localhost:3001`.*

### Executando o Painel/Cliente (Frontend)
1. Abra outro terminal na pasta `client/`:
   ```bash
   cd client
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento Vite:
   ```bash
   npm run dev
   ```
   *O Vite abrirá a aplicação por padrão em `http://localhost:5173` ou `http://localhost:3000` (caso configurado).*

---

## 📡 Comunicação em Tempo Real (Eventos WebSocket)

O sistema utiliza a biblioteca `socket.io` com os seguintes canais/eventos de rede:

| Canal/Evento | Origem | Ação / Comportamento |
| :--- | :--- | :--- |
| `register_tv` | TV (`/tv`) | Registra a aba atual como uma Tela de TV no servidor para receber chamadas. |
| `tv_count_changed` | Servidor | Transmite a contagem total de telas de TV ativas conectadas para o administrador. |
| `trigger_beep` | Admin | Solicita ao servidor o envio de um sinal sonoro (beep) para todas as TVs registradas. |
| `play_beep` | Servidor | Recebido pelas TVs para tocar o áudio sonoro de alerta físico. |
| `toggle_tv_theme` | Admin | Alterna globalmente o estado do tema (claro/escuro) em todas as TVs. |
| `tv_theme_changed` | Servidor | Notifica todas as TVs sobre o novo estado do tema (Verdadeiro para Escuro, Falso para Claro). |
| `ticket_atualizado` | Servidor | Emite os dados atualizados de um ticket individual quando ele muda de status. |
| `chamar_ticket` | Servidor | Dispara a animação e o som de chamada na TV para um ticket que entrou em atendimento. |
| `tickets_refresh` | Servidor | Notifica as telas administrativas que a lista de chamados sofreu modificações gerais. |

---

## 📝 Atualização de Inatividade (AutoRefresh)
Para evitar congelamento de dados em telas ociosas da administração, o painel do cliente inclui um script de monitoramento de inatividade. 
* Se o usuário ficar sem interações (teclado, mouse, rolagem ou toque) por **2 minutos**, a página recarrega automaticamente.
* **Nota**: Essa atualização automática é **desativada automaticamente** na rota `/tv` para garantir que a TV nunca saia da tela de visualização em tempo real.

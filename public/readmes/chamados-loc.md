# Chamados-loc (Nexus Tickets)

Este é um sistema inteligente de gerenciamento e suporte a chamados (tickets). O projeto foi desenvolvido para otimizar e automatizar o atendimento a solicitações de suporte, integrando assistências inteligentes por inteligência artificial para auxiliar os agentes e usuários no dia a dia.

## Linguagens e Tecnologias Utilizadas

O projeto é desenvolvido utilizando predominantemente **TypeScript** e **JavaScript**, abrangendo tanto o ecossistema de frontend quanto de backend:

*   **Frontend:**
    *   **React** (com TypeScript) para a construção de uma interface de usuário dinâmica, reativa e interativa.
    *   **Vite** como ferramenta de compilação (bundler) e ambiente de desenvolvimento rápido.
    *   **Tailwind CSS** para estilização flexível, moderna e responsiva.
    *   **Recharts** para exibição de gráficos interativos e métricas de desempenho dos atendimentos.
    *   **Motion (Framer Motion)** para animações fluidas na interface.
    *   **Hello Pangea Dnd** para suporte a arrastar e soltar (drag and drop) no quadro Kanban.
    *   **Lucide React** para o conjunto de ícones da interface.

*   **Backend & Banco de Dados:**
    *   **Node.js** com **Express** para estruturação da API REST e execução do servidor.
    *   **Firebase & Firebase Admin** para gerenciamento de autenticação de usuários, banco de dados noSQL em tempo real (Firestore), armazenamento de anexos (Firebase Storage) e gerenciamento de notificações (Firebase Cloud Messaging).

*   **Inteligência Artificial (IA):**
    *   **Google Gemini API** (via `@google/genai`) para análise e processamento de linguagem natural nos chamados (sugestão de prioridades, classificação por categoria, refinamento de descrições e sugestão de respostas rápidas para os agentes).

*   **Integrações e Serviços Externos:**
    *   **SendGrid** para disparo automatizado de e-mails transacionais.
    *   **Slack** para envio de alertas automáticos sobre novos chamados.
    *   **Webhooks** para comunicação com plataformas como Jira e Trello.

---

## Para que Serve o Projeto?

O **Chamados-loc** tem como propósito centralizar e agilizar o fluxo de atendimento técnico e suporte organizacional. Suas principais funcionalidades são:

1.  **Abertura e Controle de Chamados:** Registro de solicitações com campos detalhados de categoria, prioridade, anexos e datas de vencimento.
2.  **Assistência Inteligente com IA:** Processamento inteligente do chamado para auxiliar usuários na redação do problema e sugerir automaticamente sua criticidade e setor responsável.
3.  **Quadro Kanban Interativo:** Visualização clara do fluxo de trabalho das equipes (Aberto, Em Andamento, Pendente, Resolvido), permitindo a movimentação rápida de cartões de tarefas.
4.  **Agendamento Recorrente de Tarefas:** Programação de chamados automáticos diários, semanais ou mensais (ideal para rotinas de manutenção preventiva).
5.  **Métricas e Gráficos de Desempenho:** Painel com indicadores chave de performance (KPIs), volumetria por categoria e mapa de calor de horários com mais demandas.
6.  **Central de Notificações Multi-canal:** Avisos automáticos enviados via navegador (notificações push), e-mail e canais corporativos (Slack).

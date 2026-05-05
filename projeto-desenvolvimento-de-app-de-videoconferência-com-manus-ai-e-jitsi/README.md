# 🌍 LinguaConnect

**Aprenda idiomas de forma inteligente, conectando-se com estudantes do mundo todo.**

LinguaConnect é um aplicativo móvel revolucionário de estudo de idiomas que combina **trilhas adaptativas**, **conversação ao vivo com Jitsi Meet**, **simulações de vida real** e **treino de pronúncia com feedback de IA**. Projetado para brasileiros que desejam dominar novos idiomas de forma prática e imersiva.

---

## 🎯 O Problema que Resolvemos

Aprender idiomas é desafiador. Aplicativos tradicionais oferecem apenas exercícios repetitivos, sem interação real. Faltam:

- ✗ Conversação autêntica com falantes reais
- ✗ Adaptação ao nível individual do estudante
- ✗ Simulações práticas do dia a dia
- ✗ Feedback genuíno sobre pronúncia
- ✗ Motivação contínua e gamificação

**LinguaConnect resolve tudo isso** em uma única plataforma elegante e intuitiva.

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| **Frontend Mobile** | React Native + Expo | 54 |
| **Linguagem** | TypeScript | 5.9 |
| **Styling** | NativeWind (Tailwind CSS) | 4.2 |
| **Navegação** | Expo Router | 6 |
| **Estado** | React Context + AsyncStorage | - |
| **Videochamada** | Jitsi Meet (WebView) | Latest |
| **Áudio** | expo-audio | 1.1 |
| **Backend** | Express.js + tRPC | - |
| **Banco de Dados** | PostgreSQL + Drizzle ORM | - |
| **Autenticação** | OAuth 2.0 | - |
| **Testes** | Vitest | 2.1 |

---

## 📱 Funcionalidades Principais

### 1. **Trilhas Inteligentes de Aprendizado**
- Cursos estruturados em **Inglês** (iniciante/intermediário), **Espanhol** e **Francês**
- Vídeo-aulas interativas
- Exercícios adaptativos (múltipla escolha, completar frases)
- Sistema de XP e desbloqueio sequencial de módulos
- Progresso sincronizado em tempo real

### 2. **Conversação Ao Vivo com Jitsi Meet**
- Matching aleatório de parceiros por **idioma** e **nível**
- Integração nativa do Jitsi Meet via WebView
- Controles de microfone, câmera e compartilhamento
- Timer de sessão e estatísticas de conversa
- Avaliação pós-sessão com rating (1-5 estrelas)

### 3. **Modo Vida Real**
Simulações interativas de cenários do cotidiano:
- 🍽️ **Restaurante** — Fazer pedidos e conversas com garçom
- ✈️ **Aeroporto** — Check-in, passaporte e embarque
- 🛍️ **Compras** — Negociar preços e descrever produtos
- 🏥 **Médico** — Descrever sintomas e consulta
- 💼 **Trabalho** — Reuniões e apresentações profissionais
- 🥘 **Restaurante (Espanhol)** — Variação em espanhol

Cada cenário possui diálogos com múltiplas escolhas e feedback imediato.

### 4. **Treino de Pronúncia com IA**
- 10 frases em **Inglês**, **Espanhol** e **Francês**
- Gravação de áudio com visualização de onda sonora
- Transcrição fonética (IPA) e dicas de pronúncia
- Avaliação automática com score (0-100)
- Comparação com áudio nativo

### 5. **Perfil e Gamificação**
- **Sistema de XP**: Ganhe pontos em cada lição, exercício e conversa
- **Streak Diário**: Mantenha sua sequência de estudos
- **10 Conquistas Desbloqueáveis**:
  - 🌟 Primeiro Passo (completar 1 lição)
  - 🔥 7 Dias de Fogo (manter streak de 7 dias)
  - 🎤 Mestre da Pronúncia (score 90+ em pronúncia)
  - 💬 Conversador (10 sessões ao vivo)
  - 🌍 Poliglota (completar trilha em 3 idiomas)
  - E mais 5...
- **Progresso Semanal**: Gráfico de XP por dia
- **Configurações Personalizadas**: Notificações, sons, meta diária

---

## 🚀 Instruções de Instalação

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v18+): [https://nodejs.org](https://nodejs.org)
- **pnpm** (v9+): `npm install -g pnpm`
- **Expo Go** (app móvel): [iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/lingua-connect.git
cd lingua-connect
```

### Passo 2: Instalar Dependências

```bash
pnpm install
```

### Passo 3: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Backend
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000
EXPO_PUBLIC_OAUTH_PORTAL_URL=https://oauth.example.com

# Jitsi Meet (opcional)
EXPO_PUBLIC_JITSI_SERVER_URL=https://meet.jit.si
```

### Passo 4: Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

O servidor iniciará em:
- **Metro Bundler**: http://localhost:8081
- **API Backend**: http://localhost:3000

### Passo 5: Abrir no Expo Go

#### Opção A: Via QR Code (Recomendado)

1. Abra o **Expo Go** no seu dispositivo móvel
2. Escaneie o QR Code exibido no terminal ou abaixo
3. O app carregará automaticamente

#### Opção B: Via URL

1. Abra o **Expo Go**
2. Toque em "Conectar manualmente"
3. Digite: `exps://8081-ixi6yi5v1i89xpwrxqqus-6dbdbce7.us1.manus.computer`

#### Opção C: Simulador iOS/Android

```bash
# iOS (macOS apenas)
pnpm ios

# Android
pnpm android
```

---

## 📲 QR Code para Acesso Rápido

Escaneie o código abaixo com o **Expo Go** para testar o app:

<img width="343" height="363" alt="Captura de tela 2026-05-04 213055" src="https://github.com/user-attachments/assets/cee9b2ea-be8c-4caf-9cff-daefa0d58d05" />

## 📲 Pré-visualização
**URL de Pré-visualização**: https://manus.im/app-preview/n5Mvio4iqnGa75wwY4hmw7?sessionId=LpOSpAwakEU8hvXtsfk5a9


**Versão**: 1.0.0  
**Data de Lançamento**: Maio 2026  
**Status**: ✅ Pronto para Produção

Comece sua jornada de aprendizado agora! 🚀

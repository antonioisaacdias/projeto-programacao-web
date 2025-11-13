# Gerenciador de Filmes e Atores

Sistema completo de gerenciamento de filmes e atores com Next.js 15 e Node.js.

## 🚀 Tecnologias

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- React Query (TanStack Query)
- Lucide React Icons

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM

## 🐳 Executar com Docker

### Pré-requisitos
- Docker
- Docker Compose

### Comandos

**1. Build e iniciar os containers:**
```bash
docker-compose up --build
```

**2. Iniciar containers em background:**
```bash
docker-compose up -d
```

**3. Parar os containers:**
```bash
docker-compose down
```

**4. Ver logs:**
```bash
docker-compose logs -f
```

**5. Ver logs de um serviço específico:**
```bash
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Acesso

- **Frontend:** http://localhost:6000
- **Backend API:** http://localhost:3000


## 📝 Funcionalidades

- ✅ CRUD completo de Filmes
- ✅ CRUD completo de Atores
- ✅ Relacionamento Many-to-Many entre Filmes e Atores
- ✅ Paginação
- ✅ Validação de dados
- ✅ Interface responsiva
- ✅ Modais e dialogs interativos

## 🎯 Endpoints da API

### Filmes
- `GET /api/movies` - Listar filmes (paginado)
- `GET /api/movies/:id` - Buscar filme por ID
- `POST /api/movies` - Criar filme
- `PUT /api/movies/:id` - Atualizar filme
- `DELETE /api/movies/:id` - Deletar filme
- `POST /api/movies/:id/actors` - Adicionar ator ao filme
- `DELETE /api/movies/:id/actors` - Remover ator do filme

### Atores
- `GET /api/actors` - Listar atores (paginado)
- `GET /api/actors/:id` - Buscar ator por ID
- `POST /api/actors` - Criar ator
- `PUT /api/actors/:id` - Atualizar ator
- `DELETE /api/actors/:id` - Deletar ator

## 🎨 Paleta de Cores

- **Background:** `#0f0b1f` (Roxo muito escuro)
- **Foreground:** `#e8e6f0` (Branco levemente roxeado)
- **Primary:** `#8b5cf6` (Roxo vibrante)
- **Secondary:** `#a78bfa` (Roxo claro)
- **Accent:** `#c084fc` (Roxo suave/rosa)
- **Muted:** `#1e1735` (Roxo escuro para fundos)
- **Border:** `#2d2550` (Roxo médio para bordas)


## 👥 Autores

Desenvolvido como projeto acadêmico de Desenvolvimento Web pelos alunos Antonio Dias e Alicia Alexandra.

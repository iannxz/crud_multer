
---

# Sistema de Gerenciamento de Produtos e Categorias

> Sistema backend desenvolvido em Node.js com Express para gerenciar produtos com upload de imagens e categorias.

---

## 🚀 Tecnologias

* **Node.js**
* **Express**
* **MySQL**
* **Multer** (upload de arquivos)
* **dotenv** (variáveis de ambiente)

---

## 📋 Requisitos

* Node.js (v14+)
* MySQL Server
* npm ou yarn

---

## ⚙️ Instalação

**1. Clone o repositório:**

```bash
git clone <https://github.com/iannxz/crud_multer>
cd crud_multer

```

**2. Instale as dependências:**

```bash
npm install

```

**3. Configure as variáveis de ambiente no arquivo `.env`:**

```env
SERVER_PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1234
DB_NAME=loja_atividade
DB_PORT=3306

```

**4. Execute o servidor:**

```bash
npm start

```

> O servidor estará rodando em `http://localhost:8000`

---

## 📁 Estrutura do Banco de Dados

### Tabela: `categorias`

* `id_categoria` (INT, PRIMARY KEY)
* `descricao_categoria` (VARCHAR)
* `created_at` (TIMESTAMP)
* `updated_at` (TIMESTAMP)

### Tabela: `produtos`

* `id_produto` (INT, PRIMARY KEY)
* `nome_produto` (VARCHAR)
* `valor_produto` (DECIMAL)
* `id_categoria` (INT, FOREIGN KEY)
* `vinculo_imagem` (VARCHAR)
* `created_at` (TIMESTAMP)
* `updated_at` (TIMESTAMP)

---

## 🔌 Endpoints da API

### **Categorias**

#### Listar todas categorias

```http
GET /categorias

```

#### Buscar categoria por ID

```http
GET /categorias?idCategoria=1

```

#### Criar categoria

```http
POST /categorias
Content-Type: multipart/form-data

descricao: Eletrônicos

```

#### Atualizar categoria

```http
PUT /categorias/1
Content-Type: multipart/form-data

descricao: Eletrônicos Atualizado

```

#### Deletar categoria

```http
DELETE /categorias/1

```

### **Produtos**

#### Listar todos produtos

```http
GET /produtos

```

#### Buscar produto por ID

```http
GET /produtos?idProduto=1

```

#### Criar produto (com imagem)

```http
POST /produtos
Content-Type: multipart/form-data

descricao: Notebook Dell
valor: 2500.00
idCategoria: 1
imagem: [arquivo de imagem - JPG, PNG, WEBP, GIF - máximo 10MB]

```

#### Atualizar produto

```http
PUT /produtos/1
Content-Type: multipart/form-data

descricao: Notebook Dell Atualizado
valor: 2700.00

```

#### Deletar produto

```http
DELETE /produtos/1

```

---

## 📤 Upload de Arquivos

* **Tipos aceitos:** JPG, PNG, WEBP, GIF
* **Tamanho máximo:** 10MB
* **Armazenamento:** Pasta `/uploads` com hash SHA256
* **Vinculação:** Nome do arquivo salvo no campo `vinculo_imagem`

---

## 🛡️ Validações

* Validação de tipo de arquivo no backend
* Validação de tamanho de arquivo (máximo 10MB)
* Verificação de categoria existente antes de criar produto
* Foreign key com `ON DELETE CASCADE` entre produtos e categorias

---

## 📝 Boas Práticas Implementadas

* Clean Code (código limpo e organizado)
* Padrão REST para rotas
* Separação de responsabilidades (Controllers, Models, Routes)
* Tratamento de erros adequado
* Variáveis de ambiente para configurações sensíveis
* .gitignore configurado

---

## 👤 Autor

Desenvolvido como atividade prática do SENAI
@iannxz

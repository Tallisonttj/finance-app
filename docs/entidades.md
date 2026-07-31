# Entidades

## Usuário

### Atributos

| Campo | Tipo |
|--------|------|
| id | UUID |
| nome | String |
| cpf | String |
| telefone | String |
| email | String |
| senha | Hash |
| foto | String |
| perfil | Enum |
| criadoEm | DateTime |

### Regras

- CPF único.
- Login por CPF ou e-mail.
- Um usuário pode participar de várias famílias.
- Perfil:
    - Membro
    - Administrador
    - Administrador da Família

---

## Família

### Atributos

| Campo | Tipo |
|--------|------|
| id | UUID |
| nome | String |
| codigo | String |
| criadoEm | DateTime |

### Regras

- Código gerado automaticamente (UUID curto).
- Somente administradores podem adicionar ou remover membros.

---

## Despesa

### Atributos

| Campo | Tipo |
|--------|------|
| id | UUID |
| nome | String |
| valor | Decimal |
| categoria | String |
| escopo | Enum |
| dataVencimento | Date |
| parcelas | Integer |
| status | Enum |
| tipo | Enum |
| usuarioId | UUID |
| familiaId | UUID (opcional) |
| despesaPaiId | UUID (opcional) |
| criadoEm | DateTime |

### Regras

Escopo:

- Individual
- Familiar

Status:

- Pendente
- Pago

Tipo:

- Fixa
- Esporádica

Caso seja parcelada:

- uma despesa será criada para cada parcela;
- todas permanecerão vinculadas por despesaPaiId.

---

## Fonte de Renda

### Atributos

| Campo | Tipo |
|--------|------|
| id | UUID |
| descricao | String |
| valor | Decimal |
| tipo | Enum |
| usuarioId | UUID |
| criadoEm | DateTime |

### Tipo

- Salário
- Benefício
- Extra
- Outro

---

## Faxina

### Atributos

| Campo | Tipo |
|--------|------|
| id | UUID |
| nome | String |
| ultimaFaxina | Date |
| proximaFaxina | Date |
| periodo | Integer |
| status | Enum |
| familiaId | UUID |
| criadoEm | DateTime |

### Regras

- Próxima Faxina = Última Faxina + Período.
- Status:
    - OK
    - Pendente

---

## FamíliaUsuário

### Atributos

| Campo | Tipo |
|--------|------|
| id | UUID |
| membroId | UUID |
| familiaId | UUID |
| perfilNaFamilia | Enum |
| entrouEm | DateTime |

### Perfil

- Membro
- Administrador da Família

---

## Notificação

### Atributos

| Campo | Tipo |
|--------|------|
| id | UUID |
| titulo | String |
| mensagem | String |
| tipo | Enum |
| lida | Boolean |
| usuarioId | UUID |
| criadoEm | DateTime |

### Tipo

- Pagamento
- Faxina
- Sistema
# Relacionamentos

## Usuário × Família

### Cardinalidade

N : N

Implementado através da entidade **FamíliaUsuário**.

### Regras

- Um usuário pode participar de várias famílias.
- Uma família pode possuir vários usuários.
- O relacionamento armazena o perfil do membro dentro da família.
- Apenas Administrador da Família pode gerenciar membros.

---

## Usuário × Fonte de Renda

### Cardinalidade

1 : N

### Regras

- Um usuário pode possuir diversas fontes de renda.
- Toda fonte de renda pertence exclusivamente a um usuário.

---

## Usuário × Despesa

### Cardinalidade

1 : N

### Regras

Um usuário pode possuir:

- despesas individuais;
- despesas familiares.

As despesas individuais somente podem ser visualizadas pelo proprietário.

---

## Família × Despesa

### Cardinalidade

1 : N

### Regras

Uma despesa familiar:

- pertence a apenas uma família;
- é visível para todos os membros;
- tem seu valor dividido igualmente entre os integrantes ativos da família.

---

## Família × Faxina

### Cardinalidade

1 : N

### Regras

- Cada família possui seu calendário de faxinas.
- Todos os membros visualizam as datas.
- Apenas o Administrador da Família recebe notificações automáticas.

---

## Usuário × Notificação

### Cardinalidade

1 : N

### Regras

Cada notificação pertence a um único usuário.

Tipos de notificação:

### Pagamento

Enviada ao proprietário da despesa.

### Faxina

Enviada ao Administrador da Família.

### Sistema

Mensagens gerais da aplicação.

---

# Regras de Visibilidade

## Despesas Individuais

Visíveis apenas para o proprietário.

---

## Despesas Familiares

Visíveis para todos os membros da família.

---

## Fontes de Renda

Visíveis apenas para o proprietário.

---

## Faxinas

Visíveis para todos os membros da família.

---

## Notificações

Cada usuário visualiza somente suas próprias notificações.

---

# Modelo Conceitual

Usuário
│
├── Fonte de Renda
├── Despesas Individuais
├── Notificações
│
└── FamíliaUsuário
        │
        ▼
     Família
        │
        ├── Despesas Familiares
        └── Faxinas
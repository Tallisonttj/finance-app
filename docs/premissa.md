# Sistema de Contas da Casa

## Objetivo

Desenvolver um sistema para gerenciamento financeiro doméstico que permita controlar despesas, fontes de renda, famílias (grupos de usuários), lembretes de pagamentos e cronograma de faxinas.

O sistema deverá possibilitar:

- Cadastro de usuários.
- Cadastro de famílias (grupos).
- Controle de despesas individuais e familiares.
- Controle de fontes de renda.
- Controle de despesas parceladas.
- Controle de pagamento de contas.
- Lembretes automáticos de vencimentos.
- Agenda de faxinas com lembretes automáticos.

---

# Perfis do Sistema

## Administrador

Possui acesso administrativo ao sistema.

Pode:

- Gerenciar usuários.
- Gerenciar famílias.
- Gerenciar permissões.
- Acessar funcionalidades administrativas.

## Administrador da Família

Possui poderes administrativos apenas dentro das famílias em que é administrador.

Pode:

- Adicionar membros.
- Remover membros.
- Gerenciar despesas familiares.
- Gerenciar faxinas.
- Receber notificações da família.

## Membro

Pode:

- Gerenciar suas próprias despesas.
- Gerenciar suas fontes de renda.
- Visualizar despesas da família da qual participa.
- Marcar contas como pagas.
- Receber notificações das próprias contas.

---

# Requisitos Funcionais

| Código | Descrição |
|---------|-----------|
| RF01 | Cadastrar usuário |
| RF02 | Editar usuário |
| RF03 | Excluir usuário |
| RF04 | Cadastrar despesa |
| RF05 | Editar despesa |
| RF06 | Excluir despesa |
| RF07 | Consultar despesas |
| RF08 | Enviar lembretes de pagamento |
| RF09 | Cadastrar faxina |
| RF10 | Enviar lembrete de faxina |
| RF11 | Criar família |
| RF12 | Editar família |
| RF13 | Excluir família |
| RF14 | Cadastrar fonte de renda |
| RF15 | Editar fonte de renda |
| RF16 | Excluir fonte de renda |

---

# Requisitos Não Funcionais

| Código | Descrição |
|---------|-----------|
| RNF01 | O sistema deve possuir autenticação. |
| RNF02 | Deve funcionar em dispositivos móveis. |
| RNF03 | O usuário somente poderá visualizar dados próprios ou das famílias das quais participa. |
| RNF04 | Operações comuns devem responder em até 2 segundos. |
| RNF05 | Todas as APIs devem validar dados de entrada. |
| RNF06 | As senhas devem ser armazenadas utilizando hash seguro. |
| RNF07 | O sistema deve registrar logs de erro. |

---

# Regras de Negócio

## RN01

Cada usuário possui um CPF único.

---

## RN02

Somente:

- Administrador
- Administrador da Família

podem adicionar ou remover membros de uma família.

---

## RN03

As faxinas ocorrem automaticamente a cada 15 dias, considerando a data da última faxina.

---

## RN04

Ao cadastrar uma despesa parcelada, o sistema deverá gerar automaticamente um registro para cada parcela, mantendo vínculo entre todas elas.

---

## RN05

Os lembretes de pagamento deverão ser enviados:

- 5 dias antes
- 3 dias antes
- 1 dia antes

do vencimento.

---

## RN06

O lembrete de faxina deverá ser enviado na noite anterior à próxima faxina.

---

## RN07

O login poderá ser realizado utilizando:

- E-mail
- CPF

---

## RN08

Um usuário poderá participar de várias famílias simultaneamente.

---

## RN09

Despesas familiares deverão ser divididas igualmente entre todos os membros ativos da família.

---

## RN10

Os membros da família nunca terão acesso às despesas individuais dos demais integrantes.
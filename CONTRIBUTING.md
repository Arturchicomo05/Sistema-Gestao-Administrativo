# 🤝 Guia de Contribuição - ABChicomo Admin System

Obrigado pelo interesse em contribuir com o projeto! Este documento fornece diretrizes para contribuições.

---

## 📋 Índice

1. [Código de Conduta](#código-de-conduta)
2. [Como Posso Contribuir?](#como-posso-contribuir)
3. [Diretrizes de Desenvolvimento](#diretrizes-de-desenvolvimento)
4. [Processo de Pull Request](#processo-de-pull-request)
5. [Padrões de Código](#padrões-de-código)
6. [Commits](#commits)
7. [Testes](#testes)
8. [Documentação](#documentação)

---

## 📜 Código de Conduta

### Nosso Compromisso

Estamos comprometidos em proporcionar um ambiente acolhedor e inspirador para todos, independentemente de:

- Idade
- Etnia
- Identidade e expressão de gênero
- Nível de experiência
- Nacionalidade
- Aparência pessoal
- Raça
- Religião
- Orientação sexual

### Comportamento Esperado

- ✅ Use linguagem acolhedora e inclusiva
- ✅ Respeite diferentes pontos de vista
- ✅ Aceite críticas construtivas com graça
- ✅ Foque no que é melhor para a comunidade
- ✅ Mostre empatia com outros membros

### Comportamento Inaceitável

- ❌ Linguagem ou imagens sexualizadas
- ❌ Trolling, comentários insultuosos
- ❌ Assédio público ou privado
- ❌ Publicação de informações privadas de terceiros
- ❌ Conduta antiética ou não profissional

---

## 🎯 Como Posso Contribuir?

### Reportar Bugs

Antes de criar um bug report:

1. **Verifique a documentação**
2. **Procure por issues existentes**
3. **Colete informações**:
   - Versão do Node.js
   - Sistema operacional
   - Passos para reproduzir
   - Comportamento esperado vs. real
   - Screenshots (se aplicável)

**Template de Bug Report:**

```markdown
**Descrição do Bug**
Descrição clara e concisa do bug.

**Passos para Reproduzir**
1. Vá para '...'
2. Clique em '....'
3. Role até '....'
4. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
 - OS: [e.g. Windows 11]
 - Browser: [e.g. Chrome 122]
 - Node: [e.g. 18.17.0]
 - Versão: [e.g. 1.0.0]

**Contexto Adicional**
Qualquer outra informação relevante.
```

### Sugerir Melhorias

**Template de Feature Request:**

```markdown
**Sua sugestão está relacionada a um problema?**
Descrição clara do problema. Ex: Sempre fico frustrado quando [...]

**Descreva a solução que você gostaria**
Descrição clara e concisa do que você quer que aconteça.

**Alternativas consideradas**
Descrição de soluções alternativas que você considerou.

**Contexto adicional**
Qualquer outra informação relevante.
```

### Primeira Contribuição

Procure por issues com as labels:

- `good first issue` - Bons para iniciantes
- `help wanted` - Precisamos de ajuda
- `documentation` - Melhorias na documentação

---

## 🛠️ Diretrizes de Desenvolvimento

### Configuração do Ambiente

1. **Fork o repositório**

2. **Clone seu fork**
```bash
git clone https://github.com/seu-usuario/abchicomo-admin-system.git
cd abchicomo-admin-system
```

3. **Instale as dependências**
```bash
npm install
```

4. **Crie uma branch**
```bash
git checkout -b feature/minha-feature
# ou
git checkout -b fix/meu-bug
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

### Estrutura de Branches

- `main` - Branch principal (produção)
- `develop` - Branch de desenvolvimento
- `feature/*` - Novas funcionalidades
- `fix/*` - Correções de bugs
- `docs/*` - Documentação
- `refactor/*` - Refatorações
- `test/*` - Testes

---

## 🔄 Processo de Pull Request

### Antes de Submeter

- [ ] Código segue os padrões do projeto
- [ ] Comentários foram adicionados onde necessário
- [ ] Documentação foi atualizada
- [ ] Build passa sem erros
- [ ] Testes passam (quando aplicável)
- [ ] Commit messages seguem o padrão

### Criando o PR

1. **Push para seu fork**
```bash
git push origin feature/minha-feature
```

2. **Abra um Pull Request**
   - Use um título descritivo
   - Descreva as mudanças em detalhes
   - Referencie issues relacionadas (#123)
   - Adicione screenshots (se UI)

3. **Template de PR**

```markdown
## Descrição
Descrição clara das mudanças.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Passo 1
2. Passo 2
3. Passo 3

## Checklist
- [ ] Código segue os padrões
- [ ] Comentários adicionados
- [ ] Documentação atualizada
- [ ] Build passa
- [ ] Self-review realizado

## Screenshots (se aplicável)
Adicione aqui

## Issues Relacionadas
Closes #123
```

### Revisão de Código

- Seja respeitoso com feedback
- Responda a todos os comentários
- Faça as alterações solicitadas
- Force-push é permitido em feature branches

---

## 💻 Padrões de Código

### TypeScript

```typescript
// ✅ Bom
interface User {
  id: string;
  name: string;
  email: string;
}

function createUser(data: Omit<User, 'id'>): User {
  return {
    id: generateId(),
    ...data,
  };
}

// ❌ Evitar
function createUser(data: any) {
  return {
    id: generateId(),
    ...data,
  };
}
```

### React Components

```typescript
// ✅ Bom - Functional component com tipos
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {label}
    </button>
  );
}

// ❌ Evitar - Props sem tipo
export function Button({ label, onClick, variant }) {
  // ...
}
```

### Naming Conventions

```typescript
// Componentes: PascalCase
export function UserProfile() {}

// Funções: camelCase
function calculateTotal() {}

// Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// Interfaces/Types: PascalCase
interface UserData {}
type Status = 'active' | 'inactive';

// Arquivos:
// - Componentes: PascalCase (Button.tsx)
// - Utilitários: camelCase (formatDate.ts)
// - Hooks: camelCase com 'use' (useAuth.ts)
```

### Imports

```typescript
// ✅ Ordem correta
// 1. React
import { useState, useEffect } from 'react';

// 2. Libraries externas
import { motion } from 'motion/react';
import { toast } from 'sonner';

// 3. Componentes internos
import { Button } from './components/ui/button';

// 4. Hooks
import { useAuth } from './hooks/useAuth';

// 5. Utils
import { formatDate } from './utils/date';

// 6. Types
import type { User } from './types';

// 7. Styles (se necessário)
import './styles.css';
```

### Comentários

```typescript
// ✅ Bom - Comentários úteis
/**
 * Calcula o total de itens com desconto aplicado
 * @param items - Array de itens do carrinho
 * @param discountPercent - Percentual de desconto (0-100)
 * @returns Total calculado
 */
function calculateTotal(items: Item[], discountPercent: number): number {
  // Soma todos os itens
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  
  // Aplica desconto
  const discount = subtotal * (discountPercent / 100);
  
  return subtotal - discount;
}

// ❌ Evitar - Comentários óbvios
// Define a como 1
const a = 1;

// Incrementa contador
counter++;
```

### Tailwind CSS

```tsx
// ✅ Bom - Classes organizadas
<div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">

// ❌ Evitar - Classes desorganizadas
<div className="bg-zinc-900 transition-colors flex p-4 border-zinc-800 items-center rounded-lg hover:border-zinc-700 border justify-between">
```

---

## 📝 Commits

### Conventional Commits

Use o formato [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração
- `perf`: Melhoria de performance
- `test`: Testes
- `chore`: Tarefas de build/config

### Exemplos

```bash
# Feature
git commit -m "feat: adiciona filtro de busca em clientes"

# Bug fix
git commit -m "fix: corrige erro ao deletar projeto"

# Documentação
git commit -m "docs: atualiza guia de instalação"

# Breaking change
git commit -m "feat!: muda estrutura da API de clientes

BREAKING CHANGE: O campo 'nome' foi renomeado para 'name'"

# Com escopo
git commit -m "feat(auth): implementa refresh token"
```

---

## 🧪 Testes

### Executando Testes

```bash
# Todos os testes
npm test

# Testes específicos
npm test Button

# Com coverage
npm test -- --coverage
```

### Escrevendo Testes

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renderiza corretamente', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('chama onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button label="Click" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 📚 Documentação

### README

- Mantenha atualizado
- Inclua exemplos
- Screenshots quando relevante
- Links para documentação adicional

### Comentários no Código

- Explique o "porquê", não o "o quê"
- Use JSDoc para funções públicas
- Mantenha comentários atualizados

### Changelog

- Documente todas as mudanças
- Siga o formato Keep a Changelog
- Inclua breaking changes

---

## 🎨 Estilo de Código

### EditorConfig

Crie `.editorconfig`:

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

### Prettier

Crie `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### ESLint

Siga as regras do `.eslintrc` do projeto.

---

## 🤔 Dúvidas?

- 📧 **Email**: artur@abchicomo.com
- 💬 **Discussions**: GitHub Discussions
- 🐛 **Issues**: GitHub Issues

---

## 🏆 Reconhecimento

Contribuidores serão reconhecidos em:

- README.md (seção Contributors)
- CHANGELOG.md (notas de release)
- Documentação relevante

---

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.

Leia [LICENSE.md](./LICENSE.md) para mais detalhes.

---

## 🎉 Obrigado!

Sua contribuição, grande ou pequena, é valiosa para este projeto!

**Desenvolvido com ❤️ por Artur Bento Chicomo | ABChicomo Services**

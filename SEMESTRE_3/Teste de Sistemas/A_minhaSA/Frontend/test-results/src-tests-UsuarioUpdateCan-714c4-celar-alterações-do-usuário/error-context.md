# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: src\tests\UsuarioUpdateCancel.test.js >> deve cancelar alterações do usuário
- Location: src\tests\UsuarioUpdateCancel.test.js:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('B')
Expected: visible
Error: strict mode violation: getByText('B') resolved to 2 elements:
    1) <p class="text-sm">Bloco:</p> aka getByText('Bloco:')
    2) <p class="text-lg font-medium text-cyan-950">B</p> aka getByText('B', { exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('B')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary [ref=e5]:
    - navigation [ref=e7]:
      - button "Usuário" [ref=e8]
      - button "Meus Recados" [ref=e9]
      - button "Mural" [ref=e10]
    - button "Sair" [ref=e12]
  - main [ref=e13]:
    - generic [ref=e15]:
      - heading "Consulte e gerencie suas informações:" [level=2] [ref=e16]
      - generic [ref=e17]:
        - generic [ref=e18]:
          - generic [ref=e19]:
            - paragraph [ref=e20]: "Nome:"
            - paragraph [ref=e21]: Sr. Testinho Filho
          - generic [ref=e22]:
            - paragraph [ref=e23]: "Bloco:"
            - paragraph [ref=e24]: B
          - generic [ref=e25]:
            - paragraph [ref=e26]: Apartamento
            - paragraph [ref=e27]: "202"
          - generic [ref=e28]:
            - paragraph [ref=e29]: Usuário
            - paragraph [ref=e30]: TstFilho
        - generic [ref=e31]:
          - button "Alterar Informações" [ref=e32]
          - button "Excluir Usuário" [ref=e33]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | test('deve cancelar alterações do usuário', async ({ page }) => {
  4   | 
  5   |   const usuarioTeste = {
  6   |     usuario: 'TstFilho',
  7   |     senha: '321'
  8   |   }
  9   | 
  10  |   // =========================
  11  |   // ACESSA A APLICAÇÃO
  12  |   // =========================
  13  | 
  14  |   await page.goto('http://localhost:5173')
  15  | 
  16  |   // =========================
  17  |   // LOGIN
  18  |   // =========================
  19  | 
  20  |   await page
  21  |     .locator('input[placeholder="Digite seu usuário"]')
  22  |     .last()
  23  |     .fill(usuarioTeste.usuario)
  24  | 
  25  |   await page
  26  |     .locator('input[placeholder="Digite sua senha"]')
  27  |     .fill(usuarioTeste.senha)
  28  | 
  29  |   await page
  30  |     .getByRole('button', { name: 'Entrar' })
  31  |     .click()
  32  | 
  33  |   // =========================
  34  |   // VALIDA DASHBOARD
  35  |   // =========================
  36  | 
  37  |   await expect(page)
  38  |     .toHaveURL(/dashboard/)
  39  | 
  40  |   // =========================
  41  |   // ABRE TELA DE USUÁRIO
  42  |   // =========================
  43  | 
  44  |   await page
  45  |     .getByRole('button', { name: 'Usuário' })
  46  |     .click()
  47  | 
  48  |   // =========================
  49  |   // ABRE MODO EDIÇÃO
  50  |   // =========================
  51  | 
  52  |   await page
  53  |     .getByRole('button', {
  54  |       name: 'Alterar Informações'
  55  |     })
  56  |     .click()
  57  | 
  58  |   // =========================
  59  |   // ALTERA CAMPOS
  60  |   // =========================
  61  | 
  62  |   await page
  63  |     .locator('select')
  64  |     .selectOption('A')
  65  | 
  66  |   await page
  67  |     .locator('input[type="number"]')
  68  |     .fill('101')
  69  | 
  70  |   await page
  71  |     .locator('input[type="password"]')
  72  |     .fill('123')
  73  | 
  74  |   // =========================
  75  |   // CANCELA ALTERAÇÕES
  76  |   // =========================
  77  | 
  78  |   await page
  79  |     .getByRole('button', { name: 'Cancelar' })
  80  |     .click()
  81  | 
  82  |   // =========================
  83  |   // VALIDA SAÍDA DO MODO EDIÇÃO
  84  |   // =========================
  85  | 
  86  |   await expect(
  87  |     page.getByRole('button', {
  88  |       name: 'Alterar Informações'
  89  |     })
  90  |   ).toBeVisible()
  91  | 
  92  |   // =========================
  93  |   // VALIDA QUE OS DADOS
  94  |   // NÃO FORAM ALTERADOS
  95  |   // =========================
  96  | 
  97  |   await expect(
  98  |     page.getByText('B')
> 99  |   ).toBeVisible()
      |     ^ Error: expect(locator).toBeVisible() failed
  100 | 
  101 |   await expect(
  102 |     page.getByText('202')
  103 |   ).toBeVisible()
  104 | })
```
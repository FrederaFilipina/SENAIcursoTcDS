# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: src\tests\4_formLogin_P.test.js >> Deve cadastrar, logar e excluir usuário com sucesso
- Location: src\tests\4_formLogin_P.test.js:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /perfil/i })

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test('Deve cadastrar, logar e excluir usuário com sucesso', async ({ page }) => {
  4   | 
  5   |   // -----------------------------
  6   |   // MOCK cadastro
  7   |   // -----------------------------
  8   |   await page.route('**/moradores', async (route) => {
  9   |     if (route.request().method() === 'POST') {
  10  |       return route.fulfill({
  11  |         status: 201,
  12  |         contentType: 'application/json',
  13  |         body: JSON.stringify({
  14  |           message: 'Usuário cadastrado com sucesso',
  15  |         }),
  16  |       });
  17  |     }
  18  |   });
  19  | 
  20  |   // -----------------------------
  21  |   // MOCK login
  22  |   // -----------------------------
  23  |   await page.route('**/login', async (route) => {
  24  |     return route.fulfill({
  25  |       status: 200,
  26  |       contentType: 'application/json',
  27  |       body: JSON.stringify({
  28  |         message: 'Login realizado com sucesso',
  29  |       }),
  30  |     });
  31  |   });
  32  | 
  33  |   // -----------------------------
  34  |   // MOCK DELETE
  35  |   // -----------------------------
  36  |   await page.route('**/moradores/**', async (route) => {
  37  |     if (route.request().method() === 'DELETE') {
  38  |       return route.fulfill({
  39  |         status: 200,
  40  |         contentType: 'application/json',
  41  |         body: JSON.stringify({
  42  |           message: 'Usuário excluído com sucesso',
  43  |         }),
  44  |       });
  45  |     }
  46  |   });
  47  | 
  48  |   await page.goto('http://localhost:5173');
  49  | 
  50  |   // -----------------------------
  51  |   // HANDLE ALERT (ESSENCIAL)
  52  |   // -----------------------------
  53  |   page.on('dialog', async dialog => {
  54  |     await dialog.accept(); // clica em OK automaticamente
  55  |   });
  56  | 
  57  |   // -----------------------------
  58  |   // CADASTRO
  59  |   // -----------------------------
  60  |   await page.getByRole('button', { name: 'Cadastre-se' }).click();
  61  | 
  62  |   const uniqueUser = `Tst${Date.now()}`;
  63  | 
  64  |   await page.getByPlaceholder('Nome completo').fill('Sr. Teste');
  65  |   await page.getByRole('combobox', { name: 'Bloco:' }).selectOption('B');
  66  |   await page.getByPlaceholder('Ex: 102').fill('502');
  67  |   await page.getByPlaceholder('Seu usuário').fill(uniqueUser);
  68  |   await page.getByPlaceholder('********').fill('1');
  69  |   await page.getByRole('button', { name: 'Cadastrar' }).click();
  70  | 
  71  |   await expect(page.getByText('Usuário cadastrado com sucesso')).toBeVisible();
  72  | 
  73  |   // -----------------------------
  74  |   // LOGIN
  75  |   // -----------------------------
  76  |   await page.getByRole('button', { name: 'Entrar' }).click();
  77  |   await page.getByPlaceholder('Seu usuário').fill(uniqueUser);
  78  |   await page.getByPlaceholder('********').fill('1');
  79  |   await page.getByRole('button', { name: 'Entre' }).click();
  80  | 
  81  |   await expect(page).toHaveURL(/\/homescreen/);
  82  | 
  83  |   // -----------------------------
  84  |   // PERFIL
  85  |   // -----------------------------
  86  |   await page.getByRole('button', { name: /perfil/i }).click();
  87  | 
  88  |   // -----------------------------
  89  |   // EXCLUSÃO (gera alert)
  90  |   // -----------------------------
> 91  |   await page.getByRole('button', { name: /perfil/i }).click();
      |                                                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  92  | 
  93  |   // 🔥 garante que a tela de perfil carregou
  94  |   await expect(page.locator('text=/perfil|dados|usuário/i')).toBeVisible();
  95  | 
  96  |   // 🔥 localiza botão corretamente (mais robusto que getByRole aqui)
  97  |   const deleteBtn = page.locator('button', { hasText: /excluir/i });
  98  | 
  99  |   // 🔥 espera o botão aparecer no DOM
  100 |   await expect(deleteBtn).toBeVisible({ timeout: 10000 });
  101 | 
  102 |   // 🔥 clica no botão
  103 |   await deleteBtn.click();
  104 | });
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: src\tests\8_BttnMeusRecados_P.test.js >> BttnMeusRecados - deve criar recado e exibir no mural
- Location: src\tests\8_BttnMeusRecados_P.test.js:3:1

# Error details

```
Error: expect(received).toBeTruthy()

Received: undefined
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('BttnMeusRecados - deve criar recado e exibir no mural', async ({ page, request }) => {
  4  | 
  5  |   const base = Date.now();
  6  |   const usuario = `user_${base}`;
  7  | 
  8  |   // -----------------------------
  9  |   // 1. CRIA USUÁRIO
  10 |   // -----------------------------
  11 |   await request.post('http://localhost:3000/moradores', {
  12 |     data: {
  13 |       nome: 'Usuário Recado',
  14 |       bloco: 'A',
  15 |       num_ap: '101',
  16 |       usuario,
  17 |       senha: '123456'
  18 |     }
  19 |   });
  20 | 
  21 |   const usersRes = await request.get('http://localhost:3000/moradores');
  22 |   const users = await usersRes.json();
  23 | 
  24 |   const createdUser = users.find(u => u.usuario === usuario);
  25 |   expect(createdUser).toBeDefined();
  26 | 
  27 |   const userId = createdUser.id;
  28 | 
  29 |   // -----------------------------
  30 |   // 2. CRIA RECADO
  31 |   // -----------------------------
  32 |   const recadoText = 'Conteúdo do recado E2E';
  33 | 
  34 |   const recadoRes = await request.post('http://localhost:3000/recados', {
  35 |     data: {
  36 |       responsavel: userId,
  37 |       tipo_recado: 'Aviso',
  38 |       recado: recadoText
  39 |     }
  40 |   });
  41 | 
  42 |   expect(recadoRes.ok()).toBeTruthy();
  43 | 
  44 |   const createdRecado = await recadoRes.json();
> 45 |   expect(createdRecado.id).toBeTruthy();
     |                            ^ Error: expect(received).toBeTruthy()
  46 | 
  47 |   // -----------------------------
  48 |   // 3. LOGIN UI
  49 |   // -----------------------------
  50 |   await page.goto('http://localhost:5173');
  51 | 
  52 |   await page.getByRole('button', { name: 'Entrar' }).click();
  53 |   await page.getByPlaceholder('Seu usuário').fill(usuario);
  54 |   await page.getByPlaceholder('********').fill('123456');
  55 |   await page.getByRole('button', { name: 'Entre' }).click();
  56 | 
  57 |   await expect(page).toHaveURL(/homescreen/);
  58 | 
  59 |   // -----------------------------
  60 |   // 4. ABRIR MURAL (BTTNMURAL / BttnMeusRecados)
  61 |   // -----------------------------
  62 |   await page.getByRole('button', { name: /meus recados/i }).click();
  63 | 
  64 |   // 🔥 âncora correta do componente
  65 |   const mural = page.locator('text=Recados Ativos:');
  66 |   await expect(mural).toBeVisible();
  67 | 
  68 |   // -----------------------------
  69 |   // 5. ESPERA CARREGAMENTO DO useEffect
  70 |   // -----------------------------
  71 |   const card = page.locator(`text=${recadoText}`);
  72 | 
  73 |   await expect(card).toBeVisible({ timeout: 10000 });
  74 | 
  75 |   // -----------------------------
  76 |   // 6. ASSERT EXTRA (UX / renderização completa)
  77 |   // -----------------------------
  78 |   await expect(page.locator('text=Conteúdo do recado E2E')).toBeVisible();
  79 | });
```
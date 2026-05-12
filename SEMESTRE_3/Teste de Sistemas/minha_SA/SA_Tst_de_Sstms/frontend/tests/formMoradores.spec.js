import { test, expect } from '@playwright/test'

test.describe('Fluxo completo: Morador + Login', () => {

  // -----------------------------
  // 1. Cadastro de morador
  // -----------------------------
  test('deve cadastrar morador com sucesso', async ({ page }) => {

    await page.goto('/moradores')

    await page.fill('input[placeholder="Nome"]', 'Admin User')
    await page.selectOption('select', 'A')
    await page.fill('input[placeholder="Apartamento"]', '101')
    await page.fill('input[placeholder="Usuário"]', 'admin')
    await page.fill('input[type="password"]', '123')

    await page.click('button:has-text("Cadastrar")')

    // validação simples: formulário resetado
    await expect(page.locator('input[placeholder="Nome"]')).toHaveValue('')
  })


  // -----------------------------
  // 2. Login válido (admin / 123)
  // -----------------------------
  test('deve realizar login com sucesso (admin)', async ({ page }) => {

    await page.goto('/login')

    await page.fill('input[placeholder="Usuário"]', 'admin')
    await page.fill('input[placeholder="Senha"]', '123')

    await page.click('button:has-text("Entrar")')

    // valida se redirecionou para home
    await expect(page).toHaveURL(/home/)
  })


  // -----------------------------
  // 3. Login inválido
  // -----------------------------
  test('não deve logar com credenciais inválidas', async ({ page }) => {

    await page.goto('/login')

    await page.fill('input[placeholder="Usuário"]', 'errado')
    await page.fill('input[placeholder="Senha"]', 'errado')

    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Usuário ou senha inválidos')
      await dialog.dismiss()
    })

    await page.click('button:has-text("Entrar")')
  })

})
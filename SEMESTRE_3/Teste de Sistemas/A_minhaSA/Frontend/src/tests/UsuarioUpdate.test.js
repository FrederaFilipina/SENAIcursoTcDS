import { test, expect } from '@playwright/test'

test('deve cancelar alterações do usuário', async ({ page }) => {

  const usuarioTeste = {
    usuario: 'TstFilho',
    senha: '321'
  }

  // =========================
  // ACESSA A APLICAÇÃO
  // =========================

  await page.goto('http://localhost:5173')

  // =========================
  // LOGIN
  // =========================

  const loginForm = page.locator('form').last()

  await loginForm
    .locator('input[placeholder="Digite seu usuário"]')
    .fill(usuarioTeste.usuario)

  await loginForm
    .locator('input[placeholder="Digite sua senha"]')
    .fill(usuarioTeste.senha)

  await loginForm
    .getByRole('button', { name: 'Entrar' })
    .click()

  // =========================
  // VALIDA DASHBOARD
  // =========================

  await expect(page)
    .toHaveURL(/dashboard/)

  // =========================
  // CLICA EM USUÁRIO
  // =========================

  await page
    .getByRole('button', { name: 'Usuário' })
    .click()

  // =========================
  // ESPERA TELA DE USUÁRIO
  // =========================

  await expect(
    page.getByText('Consulte e gerencie suas informações:')
  ).toBeVisible()

  // =========================
  // ABRE MODO EDIÇÃO
  // =========================

  await page
    .getByRole('button', { name: 'Alterar Informações' })
    .click()

  // =========================
  // ALTERA BLOCO
  // =========================

  await page
    .locator('select')
    .selectOption('A')

  // =========================
  // ALTERA APARTAMENTO
  // =========================

  await page
    .locator('input[type="number"]')
    .fill('101')

  // =========================
  // ALTERA SENHA
  // =========================

  await page
    .locator('input[type="password"]')
    .fill('123')

  // =========================
  // VALIDA CAMPOS
  // =========================

  await expect(
    page.locator('select')
  ).toHaveValue('A')

  await expect(
    page.locator('input[type="number"]')
  ).toHaveValue('101')

  await expect(
    page.locator('input[type="password"]')
  ).toHaveValue('123')

  // =========================
  // CANCELA ALTERAÇÕES
  // =========================

  await page
    .getByRole('button', { name: 'Cancelar' })
    .click()

  // =========================
  // ESPERA ATUALIZAÇÃO
  // =========================

  await page.waitForTimeout(1000)

  // =========================
  // VALIDA DASHBOARD
  // =========================

  await expect(page)
    .toHaveURL(/dashboard/)
})
import { test, expect } from '@playwright/test'

test('deve cadastrar um novo usuário e realizar login', async ({ page }) => {

  const novoUsuario = {
    nome: 'Sr. Testinho Filho',
    bloco: 'A',
    apartamento: '101',
    usuario: `TstFilho`,
    senha: '123'
  }

  // =========================
  // ACESSA A APLICAÇÃO
  // =========================

  await page.goto('http://localhost:5173')

  // =========================
  // FORMULÁRIO DE CADASTRO
  // =========================

  const cadastroForm = page.locator('form').first()

  await cadastroForm
    .locator('input[placeholder="Digite seu nome"]')
    .fill(novoUsuario.nome)

  await cadastroForm
    .locator('select')
    .selectOption(novoUsuario.bloco)

  await cadastroForm
    .locator('input[placeholder="Ex: 101"]')
    .fill(novoUsuario.apartamento)

  await cadastroForm
    .locator('input[placeholder="Digite seu usuário"]')
    .fill(novoUsuario.usuario)

  await cadastroForm
    .locator('input[placeholder="Crie uma senha"]')
    .fill(novoUsuario.senha)

  // =========================
  // ALERT DE CADASTRO
  // =========================

  page.once('dialog', async dialog => {
    expect(dialog.message())
      .toContain('Usuário cadastrado com sucesso')

    await dialog.accept()
  })

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

  // =========================
  // ESPERA FINALIZAÇÃO CADASTRO
  // =========================

  await page.waitForTimeout(2000)

  // =========================
  // FORMULÁRIO DE LOGIN
  // =========================

  const loginForm = page.locator('form').last()

  await loginForm
    .locator('input[placeholder="Digite seu usuário"]')
    .fill(novoUsuario.usuario)

  await loginForm
    .locator('input[placeholder="Digite sua senha"]')
    .fill(novoUsuario.senha)

  await loginForm
    .getByRole('button', { name: 'Entrar' })
    .click()

  // =========================
  // VALIDA DASHBOARD
  // =========================

  await expect(page)
    .toHaveURL(/dashboard/)

  await expect(
    page.getByRole('button', { name: 'Usuário' })
  ).toBeVisible()

  await expect(
    page.getByRole('button', { name: 'Meus Recados' })
  ).toBeVisible()

  await expect(
    page.getByRole('button', { name: 'Mural' })
  ).toBeVisible()

  await expect(
    page.getByRole('button', { name: 'Sair' })
  ).toBeVisible()
})
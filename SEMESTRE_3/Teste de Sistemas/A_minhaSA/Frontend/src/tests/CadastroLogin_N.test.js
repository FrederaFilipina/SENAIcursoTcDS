import { test, expect } from '@playwright/test'

test('Deve validar que bloco é campo obrigatório', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()
  const blocoSelect = cadastroForm.locator('select')

  // Verificar que o campo tem atributo required
  const isRequired = await blocoSelect.getAttribute('required')
  expect(isRequired).toBe('')
  
  console.log('✅ Campo de bloco é obrigatório')
})

test('Deve rejeitar apartamento inválido - número muito baixo', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()

  await cadastroForm
    .locator('input[placeholder="Digite seu nome"]')
    .fill('Teste Apartamento Baixo')

  await cadastroForm
    .locator('select')
    .selectOption('A')

  await cadastroForm
    .locator('input[placeholder="Ex: 101"]')
    .fill('100')

  await cadastroForm
    .locator('input[placeholder="Digite seu usuário"]')
    .fill('user_apto_baixo')

  await cadastroForm
    .locator('input[placeholder="Crie uma senha"]')
    .fill('senha123')

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

  // Aguardar o toast aparecer com timeout maior
  await page.waitForSelector('text=/Apartamento inválido/', { timeout: 3000 })

  await page.waitForTimeout(500)
})

test('Deve rejeitar apartamento inválido - número muito alto', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()

  await cadastroForm
    .locator('input[placeholder="Digite seu nome"]')
    .fill('Teste Apartamento Alto')

  await cadastroForm
    .locator('select')
    .selectOption('A')

  await cadastroForm
    .locator('input[placeholder="Ex: 101"]')
    .fill('503')

  await cadastroForm
    .locator('input[placeholder="Digite seu usuário"]')
    .fill('user_apto_alto')

  await cadastroForm
    .locator('input[placeholder="Crie uma senha"]')
    .fill('senha123')

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

  // Aguardar o toast aparecer com timeout maior
  await page.waitForSelector('text=/Apartamento inválido/', { timeout: 3000 })

  await page.waitForTimeout(500)
})

test('Deve rejeitar apartamento inválido - formato incorreto', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()

  await cadastroForm
    .locator('input[placeholder="Digite seu nome"]')
    .fill('Teste Formato Apartamento')

  await cadastroForm
    .locator('select')
    .selectOption('A')

  await cadastroForm
    .locator('input[placeholder="Ex: 101"]')
    .fill('999')

  await cadastroForm
    .locator('input[placeholder="Digite seu usuário"]')
    .fill('user_formato_errado')

  await cadastroForm
    .locator('input[placeholder="Crie uma senha"]')
    .fill('senha123')

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

  // Aguardar o toast aparecer com timeout maior
  await page.waitForSelector('text=/Apartamento inválido/', { timeout: 3000 })

  await page.waitForTimeout(500)
})

test('Deve rejeitar usuário duplicado com mensagem de erro', async ({ page }) => {
  const usuario = {
    nome: 'Usuário Duplicado',
    bloco: 'A',
    apartamento: '101',
    usuario: `duplicado_${Date.now()}`,
    senha: '123456'
  }

  // ========================
  // PRIMEIRO CADASTRO
  // ========================

  await page.goto('http://localhost:5173')

  let cadastroForm = page.locator('form').first()

  await cadastroForm
    .locator('input[placeholder="Digite seu nome"]')
    .fill(usuario.nome)

  await cadastroForm
    .locator('select')
    .selectOption(usuario.bloco)

  await cadastroForm
    .locator('input[placeholder="Ex: 101"]')
    .fill(usuario.apartamento)

  await cadastroForm
    .locator('input[placeholder="Digite seu usuário"]')
    .fill(usuario.usuario)

  await cadastroForm
    .locator('input[placeholder="Crie uma senha"]')
    .fill(usuario.senha)

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

  // Aguardar o toast de sucesso aparecer
  await page.waitForSelector('text=/Usuário cadastrado com sucesso/', { timeout: 3000 })

  await page.waitForTimeout(2000)

  // ========================
  // SEGUNDO CADASTRO COM MESMO USUÁRIO
  // ========================

  await page.reload()

  cadastroForm = page.locator('form').first()

  await cadastroForm
    .locator('input[placeholder="Digite seu nome"]')
    .fill('Outro Nome')

  await cadastroForm
    .locator('select')
    .selectOption('B')

  await cadastroForm
    .locator('input[placeholder="Ex: 101"]')
    .fill('202')

  await cadastroForm
    .locator('input[placeholder="Digite seu usuário"]')
    .fill(usuario.usuario)

  await cadastroForm
    .locator('input[placeholder="Crie uma senha"]')
    .fill('outrasenha')

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

  // Aguardar o toast de erro aparecer
  await page.waitForSelector('text=/Usuário já existe/', { timeout: 3000 })

  await page.waitForTimeout(500)
})

test('Deve validar campo nome obrigatório', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()
  const nomeInput = cadastroForm.locator('input[placeholder="Digite seu nome"]')

  // Verificar que o campo tem atributo required
  const isRequired = await nomeInput.getAttribute('required')
  expect(isRequired).toBe('')
})

test('Deve validar campo bloco obrigatório', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()
  const blocoSelect = cadastroForm.locator('select')

  // Verificar que o campo tem atributo required
  const isRequired = await blocoSelect.getAttribute('required')
  expect(isRequired).toBe('')
})

test('Deve validar campo apartamento obrigatório', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()
  const aptoInput = cadastroForm.locator('input[placeholder="Ex: 101"]')

  // Verificar que o campo tem atributo required
  const isRequired = await aptoInput.getAttribute('required')
  expect(isRequired).toBe('')
})

test('Deve validar campo usuário obrigatório', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()
  const usuarioInput = cadastroForm.locator('input[placeholder="Digite seu usuário"]')

  // Verificar que o campo tem atributo required
  const isRequired = await usuarioInput.getAttribute('required')
  expect(isRequired).toBe('')
})

test('Deve validar campo senha obrigatório', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()
  const senhaInput = cadastroForm.locator('input[placeholder="Crie uma senha"]')

  // Verificar que o campo tem atributo required
  const isRequired = await senhaInput.getAttribute('required')
  expect(isRequired).toBe('')
})

test('Deve validar que nome é campo obrigatório', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()
  const nomeInput = cadastroForm.locator('input[placeholder="Digite seu nome"]')

  // Verificar que o campo tem atributo required
  const isRequired = await nomeInput.getAttribute('required')
  expect(isRequired).toBe('')

  console.log('✅ Campo de nome é obrigatório')
})

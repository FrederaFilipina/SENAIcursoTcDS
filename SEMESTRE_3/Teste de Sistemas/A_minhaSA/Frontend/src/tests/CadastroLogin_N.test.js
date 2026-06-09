import { test, expect } from '@playwright/test'

test('Deve rejeitar bloco inválido com mensagem de erro', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()

  // Preencher os campos
  await cadastroForm
    .locator('input[placeholder="Digite seu nome"]')
    .fill('Teste Bloco Inválido')

  // Tentar selecionar opção vazia (bloco não selecionado)
  await cadastroForm
    .locator('select')
    .selectOption('')

  await cadastroForm
    .locator('input[placeholder="Ex: 101"]')
    .fill('101')

  await cadastroForm
    .locator('input[placeholder="Digite seu usuário"]')
    .fill('user_blocinvalido')

  await cadastroForm
    .locator('input[placeholder="Crie uma senha"]')
    .fill('senha123')

  // Interceptar o alerta de erro
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Preencha todos os campos')
    await dialog.accept()
  })

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

  await page.waitForTimeout(500)
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

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Apartamento inválido')
    await dialog.accept()
  })

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

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

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Apartamento inválido')
    await dialog.accept()
  })

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

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

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Apartamento inválido')
    await dialog.accept()
  })

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

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

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Usuário cadastrado com sucesso')
    await dialog.accept()
  })

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

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

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Usuário já existe')
    await dialog.accept()
  })

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

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

test('Deve rejeitar formulário com campos vazios', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()

  // Tentar enviar sem preencher nada
  // O navegador deve impedir via validação HTML required

  const nomeInput = cadastroForm.locator('input[placeholder="Digite seu nome"]')
  const isInvalid = await nomeInput.evaluate(el => !el.checkValidity())

  expect(isInvalid).toBe(true)
})

test('Deve rejeitar apartamento com apenas 2 dígitos', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()

  await cadastroForm
    .locator('input[placeholder="Digite seu nome"]')
    .fill('Teste Dois Dígitos')

  await cadastroForm
    .locator('select')
    .selectOption('A')

  await cadastroForm
    .locator('input[placeholder="Ex: 101"]')
    .fill('10')

  await cadastroForm
    .locator('input[placeholder="Digite seu usuário"]')
    .fill('user_dois_digitos')

  await cadastroForm
    .locator('input[placeholder="Crie uma senha"]')
    .fill('senha123')

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Apartamento inválido')
    await dialog.accept()
  })

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

  await page.waitForTimeout(500)
})

test('Deve rejeitar apartamento com letras', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()

  await cadastroForm
    .locator('input[placeholder="Digite seu nome"]')
    .fill('Teste Com Letras')

  await cadastroForm
    .locator('select')
    .selectOption('A')

  // Tentar digitar letras no campo de apartamento
  const aptoInput = cadastroForm.locator('input[placeholder="Ex: 101"]')
  
  await aptoInput.fill('10A')

  // Validar que apenas números foram aceitos
  const valor = await aptoInput.inputValue()
  expect(valor).toBe('10') // Apenas dígitos

  console.log('✅ Campo de apartamento aceita apenas números')
})

test('Deve mostrar mensagem ao deixar nome em branco', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const cadastroForm = page.locator('form').first()

  // Preencher apenas com espaços em branco
  await cadastroForm
    .locator('input[placeholder="Digite seu nome"]')
    .fill('   ')

  await cadastroForm
    .locator('select')
    .selectOption('A')

  await cadastroForm
    .locator('input[placeholder="Ex: 101"]')
    .fill('101')

  await cadastroForm
    .locator('input[placeholder="Digite seu usuário"]')
    .fill('user_espacos')

  await cadastroForm
    .locator('input[placeholder="Crie uma senha"]')
    .fill('senha123')

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Preencha todos os campos')
    await dialog.accept()
  })

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

  await page.waitForTimeout(500)
})

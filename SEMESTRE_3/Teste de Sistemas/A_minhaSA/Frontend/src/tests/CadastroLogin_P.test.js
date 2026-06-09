import { test, expect } from '@playwright/test'

test('Deve cadastrar um novo usuário e fazer login com sucesso', async ({ page }) => {
  
  // ================================
  // DADOS DO USUÁRIO PARA CADASTRO
  // ================================

  const usuarioCadastro = {
    nome: 'Testinho Neto',
    bloco: 'A',
    apartamento: '101',
    usuario: `tst1`,
    senha: 'tst1'
  }

  // ================================
  // 1. ACESSAR A APLICAÇÃO
  // ================================

  await page.goto('http://localhost:5173')

  // Validar que a página carregou
  await expect(page).toHaveTitle(/.*/)

  // ================================
  // 2. PREENCHER FORMULÁRIO DE CADASTRO
  // ================================

  const cadastroForm = page.locator('form').first()

  // Preencher Nome
  await cadastroForm
    .locator('input[placeholder="Digite seu nome"]')
    .fill(usuarioCadastro.nome)

  // Preencher Bloco
  await cadastroForm
    .locator('select')
    .selectOption(usuarioCadastro.bloco)

  // Preencher Apartamento
  await cadastroForm
    .locator('input[placeholder="Ex: 101"]')
    .fill(usuarioCadastro.apartamento)

  // Preencher Usuário
  await cadastroForm
    .locator('input[placeholder="Digite seu usuário"]')
    .fill(usuarioCadastro.usuario)

  // Preencher Senha
  await cadastroForm
    .locator('input[placeholder="Crie uma senha"]')
    .fill(usuarioCadastro.senha)

  // ================================
  // 3. VALIDAR PREENCHIMENTO DO FORMULÁRIO
  // ================================

  await expect(
    cadastroForm.locator('input[placeholder="Digite seu nome"]')
  ).toHaveValue(usuarioCadastro.nome)

  await expect(
    cadastroForm.locator('select')
  ).toHaveValue(usuarioCadastro.bloco)

  await expect(
    cadastroForm.locator('input[placeholder="Ex: 101"]')
  ).toHaveValue(usuarioCadastro.apartamento)

  await expect(
    cadastroForm.locator('input[placeholder="Digite seu usuário"]')
  ).toHaveValue(usuarioCadastro.usuario)

  await expect(
    cadastroForm.locator('input[placeholder="Crie uma senha"]')
  ).toHaveValue(usuarioCadastro.senha)

  // ================================
  // 4. CLICAR NO BOTÃO CADASTRAR
  // ================================

  await cadastroForm
    .getByRole('button', { name: 'Cadastrar' })
    .click()

  // ================================
  // 5. VALIDAR TOAST DE SUCESSO
  // ================================

  await expect(
    page.getByText('Usuário cadastrado com sucesso')
  ).toBeVisible()

  await page.waitForTimeout(500)

  // ================================
  // 6. VALIDAR LIMPEZA DO FORMULÁRIO
  // ================================

  await expect(
    cadastroForm.locator('input[placeholder="Digite seu nome"]')
  ).toHaveValue('')

  await expect(
    cadastroForm.locator('input[placeholder="Ex: 101"]')
  ).toHaveValue('')

  await expect(
    cadastroForm.locator('input[placeholder="Digite seu usuário"]')
  ).toHaveValue('')

  await expect(
    cadastroForm.locator('input[placeholder="Crie uma senha"]')
  ).toHaveValue('')

  // ================================
  // 7. PREENCHER FORMULÁRIO DE LOGIN
  // ================================

  const loginForm = page.locator('form').last()

  await loginForm
    .locator('input[placeholder="Digite seu usuário"]')
    .fill(usuarioCadastro.usuario)

  await loginForm
    .locator('input[placeholder="Digite sua senha"]')
    .fill(usuarioCadastro.senha)

  // ================================
  // 8. VALIDAR PREENCHIMENTO DO LOGIN
  // ================================

  await expect(
    loginForm.locator('input[placeholder="Digite seu usuário"]')
  ).toHaveValue(usuarioCadastro.usuario)

  await expect(
    loginForm.locator('input[placeholder="Digite sua senha"]')
  ).toHaveValue(usuarioCadastro.senha)

  // ================================
  // 9. CLICAR NO BOTÃO ENTRAR
  // ================================

  await loginForm
    .getByRole('button', { name: 'Entrar' })
    .click()

  // ================================
  // 10. AGUARDAR REDIRECIONAMENTO
  // ================================

  await page.waitForNavigation()

  // ================================
  // 11. VALIDAR ACESSO AO DASHBOARD
  // ================================

  // Verificar URL
  await expect(page).toHaveURL(/dashboard/)

  // Verificar presença de botões principais
  await expect(
    page.getByRole('button', { name: 'Usuário' })
  ).toBeVisible()

  await expect(
    page.getByRole('button', { name: 'Mural' })
  ).toBeVisible()

  await expect(
    page.getByRole('button', { name: 'Sair' })
  ).toBeVisible()

  // ================================
  // 12. VALIDAR SUCESSO DO LOGIN
  // ================================

  // Se chegou até aqui sem erros, significa que:
  // ✅ Cadastro foi bem-sucedido
  // ✅ Login foi bem-sucedido
  // ✅ Redirecionamento para dashboard funcionou
  // ✅ Dashboard está acessível e os botões estão visíveis

  console.log('✅ Teste de Cadastro e Login concluído com sucesso!')
})

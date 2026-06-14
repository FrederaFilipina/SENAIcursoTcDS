import { test, expect } from '@playwright/test'

const usuarioTeste = {
    usuario: 'tst',
    senha: 'tst'
}

async function acessarMeusRecados(page) {
    await page.goto('http://localhost:5173')

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

    await expect(page).toHaveURL(/dashboard/)

    await page
        .getByRole('button', { name: 'Meus Recados' })
        .click()

    await expect(
        page.getByText('Criar Novo Recado')
    ).toBeVisible()
}

test('Deve criar recado com sucesso', async ({ page }) => {
    await acessarMeusRecados(page)

    const textoRecado =
        'Recado Teste! 1 2 3, testando! Testando, 1 2 3!!!'

    await page.getByTestId('novo-recado').fill(textoRecado)
    await page.getByTestId('btn-criar-recado').click()

    await expect(page.getByText(textoRecado)).toBeVisible()
})

test('Deve criar comunicado com sucesso', async ({ page }) => {
    await acessarMeusRecados(page)

    const textoRecado =
        'Comunicado Teste! 1 2 3, testando! Testando, 1 2 3!!!'

    await page.getByTestId('tipo-recado').selectOption('Comunicado')
    await page.getByTestId('novo-recado').fill(textoRecado)
    await page.getByTestId('btn-criar-recado').click()

    const card = page
        .locator('[data-testid^="recado-"]')
        .filter({ hasText: textoRecado })

    await expect(card).toBeVisible()
    await expect(card).toContainText('Comunicado')
})

test('Deve editar recado com sucesso', async ({ page }) => {
    await acessarMeusRecados(page)

    const textoOriginal = `Editar ${Date.now()}`
    const textoAtualizado = 'Teste editado com sucesso'

    await page.getByTestId('novo-recado').fill(textoOriginal)
    await page.getByTestId('btn-criar-recado').click()

    const card = page
        .locator('[data-testid^="recado-"]')
        .filter({ hasText: textoOriginal })

    await expect(card).toBeVisible()
    const testId = await card.getAttribute('data-testid')
    const id = testId.replace('recado-', '')

    await card
        .locator('[data-testid^="btn-editar-"]')
        .click()

    const inputEdicao = page.locator(`[data-testid="input-edicao-${id}"]`)

    await inputEdicao.waitFor({ state: 'visible' })
    await expect(inputEdicao).toBeEnabled()

    await inputEdicao.click()
    await inputEdicao.fill(textoAtualizado)

    const btnSalvar = page.getByTestId(`btn-salvar-${id}`)

    await expect(btnSalvar).toBeVisible()

    await btnSalvar.click()

    await expect(
        page.getByTestId(`recado-${id}`)
    ).toContainText(textoAtualizado)

    await expect(
        card.locator('[data-testid^="input-edicao-"]')
    ).toHaveCount(0)
})

test('Deve cancelar edição do recado', async ({ page }) => {
    await acessarMeusRecados(page)

    const textoRecado = `Cancelar ${Date.now()}`

    await page.getByTestId('novo-recado').fill(textoRecado)
    await page.getByTestId('btn-criar-recado').click()

    const card = page
        .locator('[data-testid^="recado-"]')
        .filter({ hasText: textoRecado })

    await expect(card).toBeVisible()

    const testId = await card.getAttribute('data-testid')
    const id = testId.replace('recado-', '')

    // clicar em editar
    await card
        .locator('[data-testid^="btn-editar-"]')
        .click()

    const input = page.getByTestId(`input-edicao-${id}`)

    await expect(input).toBeVisible()
    await expect(input).toBeEnabled()

    await input.fill('Texto alterado')

    const btnCancelar = page.getByTestId(`btn-cancelar-${id}`)

    await expect(btnCancelar).toBeVisible()
    await btnCancelar.click()

    // validações finais
    await expect(
        page.getByTestId(`input-edicao-${id}`)
    ).toHaveCount(0)

    await expect(
        page.getByText(textoRecado)
    ).toBeVisible()

    await expect(
        page.getByText('Texto alterado')
    ).toHaveCount(0)
})

test('Deve excluir recado com sucesso', async ({ page }) => {
    await acessarMeusRecados(page)

    const textoRecado = `Excluir ${Date.now()}`

    await page.getByTestId('novo-recado').fill(textoRecado)
    await page.getByTestId('btn-criar-recado').click()

    const card = page
        .locator('[data-testid^="recado-"]')
        .filter({ hasText: textoRecado })

    await expect(card).toBeVisible()

    const btnExcluir =
        card.locator('[data-testid^="btn-excluir-"]')

    await expect(btnExcluir).toBeVisible()

    await btnExcluir.click()

    await expect(card).toHaveCount(0)
})
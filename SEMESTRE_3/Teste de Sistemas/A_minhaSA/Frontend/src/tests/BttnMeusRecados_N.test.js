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

test('Deve exibir erro ao tentar criar recado vazio', async ({ page }) => {
    await acessarMeusRecados(page)

    await page.getByTestId('novo-recado').fill('   ')

    await page.getByTestId('btn-criar-recado').click()

    const toast = page.locator('[role="alert"]').last()

    await expect(toast).toContainText(
        'O recado não pode estar vazio'
    )
})

test('Deve exibir erro ao tentar salvar edição vazia', async ({ page }) => {
    await acessarMeusRecados(page)

    const textoRecado = `Teste ${Date.now()}`

    // cria um recado para editar
    await page.getByTestId('novo-recado').fill(textoRecado)
    await page.getByTestId('btn-criar-recado').click()

    const cardOriginal = page
        .locator('[data-testid^="recado-"]')
        .filter({ hasText: textoRecado })
        .first()

    await expect(cardOriginal).toBeVisible()

    const testId = await cardOriginal.getAttribute('data-testid')
    const id = testId.replace('recado-', '')

    // trava o locator no card correto
    const card = page.getByTestId(`recado-${id}`)

    // entra em modo edição
    await card
        .locator('[data-testid^="btn-editar-"]')
        .click()

    const input = page.getByTestId(
        `input-edicao-${id}`
    )

    await expect(input).toBeVisible()

    // limpa o conteúdo
    await input.fill('')

    // tenta salvar
    await page
        .getByTestId(`btn-salvar-${id}`)
        .click()

    const toast = page.locator('[role="alert"]').last()

    await expect(toast).toContainText(
        'O recado não pode ficar vazio'
    )
    // continua em modo edição
    await expect(input).toBeVisible()

    // o valor digitado continua vazio
    await expect(input).toHaveValue('')

    // botões continuam disponíveis
    await expect(
        page.getByTestId(`btn-salvar-${id}`)
    ).toBeVisible()

    await expect(
        page.getByTestId(`btn-cancelar-${id}`)
    ).toBeVisible()
})
import { test, expect } from '@playwright/test'

const usuarioTeste = {
    usuario: 'tst2',
    senha: 'tst2'
}

async function abrirTelaEdicao(page) {

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
        .getByRole('button', { name: 'Usuário' })
        .click()

    await expect(
        page.getByRole('heading', {
            name: 'Consulte e gerencie suas informações:'
        })
    ).toBeVisible()

    await page
        .getByRole('button', {
            name: /Alterar|Editar/
        })
        .click()
}

test('Deve exibir erro para apartamento inválido', async ({ page }) => {

    await abrirTelaEdicao(page)

    await page
        .locator('input')
        .nth(1)
        .fill('999')

    await page
        .getByRole('button', { name: /Salvar/ })
        .click()

    await expect(
        page.getByText(
            /Apartamento inválido/
        )
    ).toBeVisible()
})

test('Deve exibir erro quando o usuário já existir', async ({ page }) => {

    await abrirTelaEdicao(page)

    await page.route('**/usuarios', async route => {

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([
                {
                    id: 999,
                    usuario: 'usuarioExistente'
                }
            ])
        })
    })

    await page
        .locator('input')
        .nth(2)
        .fill('usuarioExistente')

    await page
        .getByRole('button', { name: /Salvar/ })
        .click()

    await expect(
        page.getByText('Usuário já existe')
    ).toBeVisible()
})

test('Deve exibir erro ao atualizar usuário', async ({ page }) => {

    await abrirTelaEdicao(page)

    await page.route('**/usuarios/*', async route => {

        if (route.request().method() === 'PUT') {
            await route.abort()
            return
        }

        await route.continue()
    })

    await page
        .getByRole('button', { name: /Salvar/ })
        .click()

    await expect(
        page.getByText('Erro ao atualizar usuário')
    ).toBeVisible()
})

test('Deve exibir erro ao excluir usuário', async ({ page }) => {

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
        .getByRole('button', { name: 'Usuário' })
        .click()

    page.on('dialog', async dialog => {
        await dialog.accept()
    })

    await page.route('**/usuarios/*', async route => {
        await route.abort()
    })

    await page
        .getByRole('button', {
            name: 'Excluir Usuário'
        })
        .click()

    await expect(
        page.getByText(
            'Erro ao excluir usuário'
        )
    ).toBeVisible()
})
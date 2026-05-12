import { test, expect } from '@playwright/test'

test.describe('Testar tela de login', () => {

    // beforeEach roda antes de cada teste
    test.beforeEach(async ({ page }) => {
        await page.goto("/")
    })

    test("testar o login do usuário com sucesso", async ({ page }) => {
        // configurar o play para prencher os campos
        await page.fill('#username', 'admin')
        await page.fill('#password', 'admin')

        await page.click('button[type=submit]')

        // verificar se transicionou (aceitou login)
        await expect(page.locator('#welcome-title')).toContainText('Bem-vindo, Admin!')
    })

    test("testar com credenciais erradas", async ({ page }) => {

        await page.fill('#username', 'usuarioErrado')
        await page.fill('#password', 'senhaErrada')

        await page.click('button[type=submit]')

        await expect(
            page.locator('text=Usuário ou senha inválidos')
        ).toBeVisible()

        await expect(
            page.locator('#welcome-title')
        ).not.toBeVisible()

    })


    test("testar o fluxo completo com sair", async ({ page }) => {

        await page.fill('#username', 'admin')
        await page.fill('#password', 'admin')

        await page.click('button[type=submit]')

        await expect(
            page.locator('#welcome-title')
        ).toContainText('Bem-vindo, Admin!')

        await page.click('#logout-button')

        await expect(
            page.locator('#username')
        ).toBeVisible()

        await expect(
            page.locator('#password')
        ).toBeVisible()

        await expect(
            page.locator('#welcome-title')
        ).not.toBeVisible()

    })

})



import { test, expect } from '@playwright/test'

test("deve incrementar o contador ao clicar no botão", async ({ page }) => {
    await page.goto('/')

    // locator estável (não depende do texto dinâmico)
    const counterButton = page.getByRole('button')

    await expect(counterButton).toBeVisible()
    await expect(counterButton).toHaveText('Count is 0')

    await counterButton.click()

    for (let i = 0; i < 5; i++) {
        await counterButton.click()
    }

    await expect(counterButton).toHaveText('Count is 6')
})
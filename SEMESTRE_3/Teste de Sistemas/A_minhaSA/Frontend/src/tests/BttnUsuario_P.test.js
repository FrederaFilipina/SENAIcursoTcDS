import { test, expect } from '@playwright/test'

test('Deve editar dados do usuário com sucesso', async ({ page }) => {
    const usuarioCadastro = {
        nome: 'Testinho Neto',
        bloco: 'A',
        apartamento: '101',
        usuario: 'tst1',
        senha: 'tst1'
    }

    const usuarioAtualizado = {
        nome: 'Testinho Neto Primeiro',
        bloco: 'B',
        apartamento: '202',
        usuario: 'tst2',
        senha: 'tst2'
    }

    // 1. ACESSAR A APLICAÇÃO
    await page.goto('http://localhost:5173')

    // 2. FAZER LOGIN
    const loginForm = page.locator('form').last()

    await loginForm
        .locator('input[placeholder="Digite seu usuário"]')
        .fill(usuarioCadastro.usuario)

    await loginForm
        .locator('input[placeholder="Digite sua senha"]')
        .fill(usuarioCadastro.senha)

    await loginForm
        .getByRole('button', { name: 'Entrar' })
        .click()

    // 3. VALIDAR ACESSO AO DASHBOARD
    await expect(page).toHaveURL(/dashboard/, { timeout: 5000 })

    // 4. ABRIR PAINEL DO USUÁRIO
    await page.getByRole('button', { name: 'Usuário' }).click()

    // 5. VALIDAR PAINEL
    await expect(
        page.getByRole('heading', {
            name: 'Consulte e gerencie suas informações:'
        })
    ).toBeVisible()

    // 6. ENTRAR EM MODO DE EDIÇÃO
    await page.getByRole('button', { name: /Alterar|Editar/ }).click()

    await expect(page.locator('input').first()).toBeEnabled()

    // 7. PREENCHER NOVOS DADOS
    const nomeEditInput = page.locator('input').nth(0)
    const blocoEditSelect = page.locator('select').first()
    const apartamentoEditInput = page.locator('input').nth(1)
    const usuarioEditInput = page.locator('input').nth(2)
    const senhaEditInput = page.locator('input').nth(3)

    await nomeEditInput.fill(usuarioAtualizado.nome)
    await blocoEditSelect.selectOption(usuarioAtualizado.bloco)
    await apartamentoEditInput.fill(usuarioAtualizado.apartamento)
    await usuarioEditInput.fill(usuarioAtualizado.usuario)
    await senhaEditInput.fill(usuarioAtualizado.senha)

    // 8. VALIDAR PREENCHIMENTO
    await expect(nomeEditInput).toHaveValue(usuarioAtualizado.nome)
    await expect(blocoEditSelect).toHaveValue(usuarioAtualizado.bloco)
    await expect(apartamentoEditInput).toHaveValue(usuarioAtualizado.apartamento)
    await expect(usuarioEditInput).toHaveValue(usuarioAtualizado.usuario)
    await expect(senhaEditInput).toHaveValue(usuarioAtualizado.senha)

    // 9. SALVAR
    await page.getByRole('button', { name: /Salvar/ }).click()

    // 10. VALIDAR SUCESSO
    await expect(
        page.getByText(/Dados atualizados com sucesso/)
    ).toBeVisible({ timeout: 10000 })

    // 11. VALIDAR REDIRECIONAMENTO PARA O MURAL
    await expect(
        page.locator('main')
    ).toContainText('Recado do morador:')

    console.log('✅ Teste de edição de usuário concluído com sucesso!')
})

test('Deve validar que os dados do usuário estão no localStorage', async ({ page }) => {
    const usuarioCadastro = {
        nome: 'Storage Test',
        bloco: 'A',
        apartamento: '101',
        usuario: `storage_${Date.now()}`,
        senha: 'storage123'
    }

    // 1. CADASTRAR USUÁRIO
    await page.goto('http://localhost:5173')

    const cadastroForm = page.locator('form').first()

    await cadastroForm
        .locator('input[placeholder="Digite seu nome"]')
        .fill(usuarioCadastro.nome)

    await cadastroForm
        .locator('select')
        .selectOption(usuarioCadastro.bloco)

    await cadastroForm
        .locator('input[placeholder="Ex: 101"]')
        .fill(usuarioCadastro.apartamento)

    await cadastroForm
        .locator('input[placeholder="Digite seu usuário"]')
        .fill(usuarioCadastro.usuario)

    await cadastroForm
        .locator('input[placeholder="Crie uma senha"]')
        .fill(usuarioCadastro.senha)

    await cadastroForm
        .getByRole('button', { name: 'Cadastrar' })
        .click()

    await expect(
        page.getByText(/Usuário cadastrado com sucesso/)
    ).toBeVisible()

    // 2. LOGIN
    const loginForm = page.locator('form').last()

    await loginForm
        .locator('input[placeholder="Digite seu usuário"]')
        .fill(usuarioCadastro.usuario)

    await loginForm
        .locator('input[placeholder="Digite sua senha"]')
        .fill(usuarioCadastro.senha)

    await loginForm
        .getByRole('button', { name: 'Entrar' })
        .click()

    await expect(
        page.locator('main')
    ).toContainText('Recado do morador:')

    // 3. VALIDAR LOCALSTORAGE
    const usuarioLogado = await page.evaluate(() => {
        return JSON.parse(localStorage.getItem('usuarioLogado'))
    })

    expect(usuarioLogado).toEqual(
        expect.objectContaining({
            nome: usuarioCadastro.nome,
            bloco: usuarioCadastro.bloco,
            num_ap: usuarioCadastro.apartamento,
            usuario: usuarioCadastro.usuario,
            senha: usuarioCadastro.senha
        })
    )

    console.log('✅ Dados do usuário validados no localStorage!')
})

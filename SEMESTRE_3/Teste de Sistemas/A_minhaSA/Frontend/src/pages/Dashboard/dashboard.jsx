function Dashboard() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">
        Bem-vindo, {usuarioLogado?.nome}
      </h1>

      <p>Usuário: {usuarioLogado?.usuario}</p>
    </div>
  )
}

export default Dashboard
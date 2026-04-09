import { useEffect, useState } from 'react'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Cadastrar } from './pages/Register';


function App() {
  const [dataLogin, setDataLogin] = useState<any>(null);
  const [registrar, setRegistrar] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("tokenAcesso")
    const refreshToken = localStorage.getItem("tokenRefresh")
    const hasTokens = accessToken && refreshToken
    if (hasTokens) {
      setDataLogin({
        accessToken,
        refreshToken
      })
    }
  }, [])

  return (
    <>
      {dataLogin !== null ? <Home setDataLogin={setDataLogin} /> : registrar ?
        <Cadastrar setCadastro={setRegistrar} />
        :
        <Login
          setDataLogin={setDataLogin}
          setCadastrar={setRegistrar}
        />

      }

    </>
  )
}

export default App

import Navbar from "../Navbar/navbar"

function Dashboard({ children, setPaginaAtual }) {

  return (

    <div className="w-screen h-screen flex bg-gray-100 overflow-hidden">

      {/* NAVBAR */}
      <aside
        className="w-[20%] h-full bg-gray-900 flex-shrink-0"
      >

        <Navbar setPaginaAtual={setPaginaAtual} />

      </aside>

      {/* CONTEÚDO */}
      <main
        className="w-[80%] h-full overflow-auto p-10"
      >

        <section
          className="w-full min-h-full bg-gray-300
                     rounded-2xl shadow-xl
                     border border-gray-200 p-10"
        >

          {children}

        </section>

      </main>

    </div>
  )
}

export default Dashboard
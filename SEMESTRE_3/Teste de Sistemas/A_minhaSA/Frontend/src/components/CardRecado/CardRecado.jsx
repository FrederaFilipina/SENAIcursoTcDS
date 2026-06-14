function CardRecado({ recado, nomeUsuario, editando, textoEditado, setTextoEditado, onEditar, onSalvar, onExcluir, onCancelar, mostrarAcoes = false }) {

  const modoEdicao = mostrarAcoes && editando === recado.id

  console.log('CARD', {
  recadoId: recado.id,
  tipoRecadoId: typeof recado.id,
  editando,
  tipoEditando: typeof editando,
  modoEdicao
})

  return (

    <div
      className="p-5 bg-white border rounded-xl shadow flex flex-col gap-4"
    >

      <div className="flex justify-between items-start gap-4">

        <p className="text-sm font-semibold text-gray-700">
          Recado do morador:{" "}

          <span className="text-gray-900">
            {nomeUsuario}
          </span>
        </p>

        <p className="text-xs text-gray-400 whitespace-nowrap">
          {new Date(recado.criado).toLocaleString("pt-BR")}
        </p>

      </div>

      <p className="text-sm text-gray-600">
        Tipo do recado:{" "}

        <span className="font-semibold text-gray-800">
          {recado.tipo_recado}
        </span>

      </p>

      <div
        className="bg-pink-50 border rounded-xl p-4"
      >

        {modoEdicao ? (

          <textarea
            data-testid={`input-edicao-${recado.id}`}
            value={textoEditado}
            onChange={(e) => setTextoEditado(e.target.value)}
            rows={4}
            className="w-full
                       resize-none
                       bg-transparent
                       outline-none
                       text-gray-800
                       font-medium"
          />

        ) : (

          <p className="text-gray-800 font-medium break-words">
            {recado.recado}
          </p>

        )}

      </div>

      {mostrarAcoes && (

        <div className="flex flex-col md:flex-row gap-3">

          {modoEdicao ? (

            <>
              <button
                data-testid={`btn-salvar-${recado.id}`}
                onClick={() =>
                  onSalvar?.(recado.id)
                }
                className="px-6 py-3
                           bg-cyan-950
                           text-white
                           rounded-xl
                           font-semibold
                           hover:bg-green-600
                           transition"
              >
                Salvar
              </button>

              <button
                data-testid={`btn-cancelar-${recado.id}`}
                onClick={onCancelar}
                className="px-6 py-3
                           bg-cyan-950
                           text-white
                           rounded-xl
                           font-semibold
                           hover:bg-gray-500
                           transition"
              >
                Cancelar
              </button>
            </>

          ) : (

            <>
              <button
                data-testid={`btn-editar-${recado.id}`}
                onClick={() => {
                  console.log({
                    recadoId: recado.id,
                    editando,
                    iguais: editando === recado.id,
                    tipoRecadoId: typeof recado.id,
                    tipoEditando: typeof editando
                  })
                  onEditar?.(recado)
                }}
                className="px-6 py-3
                           bg-cyan-950
                           text-white
                           rounded-xl
                           font-semibold
                           hover:bg-cyan-600
                           transition"
              >
                Editar
              </button>

              <button
                data-testid={`btn-excluir-${recado.id}`}
                onClick={() =>
                  onExcluir?.(recado.id)
                }
                className="px-6 py-3
                           bg-red-800
                           text-white
                           rounded-xl
                           font-semibold
                           hover:bg-red-600
                           transition"
              >
                Excluir
              </button>
            </>

          )}

        </div>

      )}

    </div>
  )
}

export default CardRecado
function CardRecado({ recado, nomeUsuario }) {

  return (

    <div
      className="p-5 bg-white border rounded-xl shadow
                 flex flex-col gap-4"
    >

      {/* TOPO */}
      <div className="flex justify-between items-start gap-4">

        {/* MORADOR */}
        <p className="text-sm font-semibold text-gray-700">
          Recado do morador:{" "}

          <span className="text-gray-900">
            {nomeUsuario}
          </span>
        </p>

        {/* DATA */}
        <p className="text-xs text-gray-400 whitespace-nowrap">
          {new Date(recado.criado).toLocaleString("pt-BR")}
        </p>

      </div>

      {/* TIPO */}
      <p className="text-sm text-gray-600">

        Tipo do recado:{" "}

        <span
          className="font-semibold text-gray-800"
        >
          {recado.tipo_recado}
        </span>

      </p>

      {/* TEXTO */}
      <div
        className="bg-gray-50 border rounded-xl
                   p-4"
      >

        <p className="text-gray-800 font-medium break-words">
          {recado.recado}
        </p>

      </div>

    </div>
  )
}

export default CardRecado
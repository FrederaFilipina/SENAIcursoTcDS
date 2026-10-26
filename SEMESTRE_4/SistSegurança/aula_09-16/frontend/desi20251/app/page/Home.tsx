"use client";

import { useEffect, useState } from "react";
import { api, errorMessage } from "../services/api";
import type { Session } from "../services/login";

type Material = { id: number; name: string; category: string; };
type User = { id: number; name: string; email: string; role: string; };
type SearchResponse = { produtos: Material[]; usuarios: User[]; };

type Props = { session: Session; onLogout: () => void; };

export default function Home({ session, onLogout }: Props) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [deleting, setDeleting] = useState<number | null>(null);

  const [revision, setRevision] = useState(0);

  // Texto digitado no campo de pesquisa.
  const [pesquisa, setPesquisa] = useState("");

  // Texto que realmente foi enviado para a API.
  const [buscaRealizada, setBuscaRealizada] = useState("");

  // Define se o admin está vendo produtos ou usuários.
  const [visualizacao, setVisualizacao] = useState<
    "produtos" | "usuarios"
  >("produtos");

  const isAdmin = session.user.role === "admin";

  // Busca os dados na API.
  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get<SearchResponse>(
          "/materials",
          {
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
            params: {
              search: buscaRealizada,
            },
          }
        );

        if (active) {
          setMaterials(response.data.produtos);
          setUsers(response.data.usuarios);
        }
      } catch (error) {
        if (active) {
          setError(errorMessage(error));
          setMaterials([]);
          setUsers([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [session.token, revision, buscaRealizada]);

  // Executa a pesquisa.
  function pesquisar() {
    setError("");
    setNotice("");

    setBuscaRealizada(pesquisa.trim());
  }

  // Limpa a pesquisa.
  function limparPesquisa() {
    setPesquisa("");
    setBuscaRealizada("");
    setError("");
    setNotice("");

    if (buscaRealizada === "") {
      setRevision((current) => current + 1);
    }
  }

  // Atualiza os dados.
  function refresh() {
    setError("");
    setNotice("");

    setRevision((current) => current + 1);
  }

  // Exclui um produto.
  async function remove(material: Material) {
    if (
      !window.confirm(
        `Excluir ${material.name} do banco de dados?`
      )
    ) {
      return;
    }

    setDeleting(material.id);
    setError("");
    setNotice("");

    try {
      await api.delete(`/materials/${material.id}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      setMaterials((current) =>
        current.filter(
          (item) => item.id !== material.id
        )
      );

      setNotice(`${material.name} excluído.`);
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <section
      className="panel"
      aria-labelledby="materials-title"
    >
      {/* Informações do usuário */}
      <div className="actions">
        <p>
          <strong>{session.user.name}</strong>
          {" · "}
          {session.user.email}
        </p>

        <button
          className="secondary"
          onClick={onLogout}
        >
          Sair
        </button>
      </div>

      <h1 id="materials-title">
        Materiais
      </h1>

      <p>
        Perfil:{" "}
        <strong>
          {isAdmin
            ? "Administrador (admin)"
            : "Usuário comum (user)"}
        </strong>
      </p>

      <p>
        {isAdmin
          ? "Você pode consultar produtos e usuários e excluir materiais."
          : "Você pode consultar produtos por nome ou categoria."}
      </p>

      {/* Barra de pesquisa */}
      <div className="pesquisa">
        <input
          type="text"
          placeholder={
            isAdmin
              ? "Pesquisar produtos ou usuários..."
              : "Pesquisar produtos..."
          }
          value={pesquisa}
          onChange={(e) =>
            setPesquisa(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              pesquisar();
            }
          }}
          aria-label="Pesquisar"
        />

        <button
          className="secondary"
          onClick={pesquisar}
          disabled={
            loading || deleting !== null
          }
        >
          Pesquisar
        </button>

        <button
          className="secondary"
          onClick={limparPesquisa}
          disabled={
            loading ||
            deleting !== null ||
            (pesquisa === "" &&
              buscaRealizada === "")
          }
        >
          Limpar
        </button>
      </div>

      {/* Botões de separação do administrador */}
      {isAdmin && (
        <div className="actions">
          <button
            className="secondary"
            onClick={() =>
              setVisualizacao("produtos")
            }
          >
            Produtos
          </button>

          <button
            className="secondary"
            onClick={() =>
              setVisualizacao("usuarios")
            }
          >
            Usuários
          </button>
        </div>
      )}

      {/* Botão atualizar */}
      <button
        className="secondary"
        disabled={
          loading || deleting !== null
        }
        onClick={refresh}
      >
        Atualizar
      </button>

      {/* Mensagens */}
      {error && (
        <p
          className="error"
          role="alert"
        >
          {error}
        </p>
      )}

      {notice && (
        <p
          className="success"
          role="status"
        >
          {notice}
        </p>
      )}

      {/* Conteúdo */}
      {loading ? (
        <p role="status">
          Carregando...
        </p>
      ) : (
        <>
          {/* ========================= */}
          {/* PRODUTOS */}
          {/* ========================= */}

          {visualizacao === "produtos" && (
            <>
              <h2>Produtos</h2>

              {materials.length > 0 ? (
                <ul className="materials">
                  {materials.map(
                    (material) => (
                      <li
                        key={material.id}
                      >
                        <span>
                          <strong>
                            {material.name}
                          </strong>
                          {" · "}
                          {material.category}
                        </span>

                        {isAdmin ? (
                          <button
                            className="danger"
                            disabled={
                              deleting !== null
                            }
                            onClick={() =>
                              remove(material)
                            }
                          >
                            {deleting ===
                            material.id
                              ? "Excluindo..."
                              : "Excluir"}
                          </button>
                        ) : (
                          <span className="muted">
                            Somente leitura
                          </span>
                        )}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="muted">
                  Nenhum produto encontrado.
                </p>
              )}
            </>
          )}

          {/* ========================= */}
          {/* USUÁRIOS */}
          {/* ========================= */}

          {isAdmin &&
            visualizacao ===
              "usuarios" && (
              <>
                <h2>Usuários</h2>

                {users.length > 0 ? (
                  <ul className="materials">
                    {users.map(
                      (user) => (
                        <li
                          key={user.id}
                        >
                          <span>
                            <strong>
                              {user.name}
                            </strong>
                            {" · "}
                            {user.email}
                            {" · "}
                            <span className="muted">
                              {user.role ===
                              "admin"
                                ? "Administrador"
                                : "Usuário"}
                            </span>
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="muted">
                    Nenhum usuário encontrado.
                  </p>
                )}
              </>
            )}
        </>
      )}
    </section>
  );
}

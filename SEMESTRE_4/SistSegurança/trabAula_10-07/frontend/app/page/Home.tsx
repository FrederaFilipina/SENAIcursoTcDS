
"use client";

import { useEffect, useState } from "react";
import { api, errorMessage } from "../services/api";
import type { Session } from "../services/login";

type Material = {
  id: number;
  name: string;
  category: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type Comment = {
  id: number;
  comment: string;
  created_at: string;
  user_name: string;
};

type SearchResponse = {
  produtos: Material[];
  usuarios: User[];
};

type Props = {
  session: Session;
  onLogout: () => void;
};

export default function Home({ session, onLogout }: Props) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [comments, setComments] = useState<
    Record<number, Comment[]>
  >({});

  const [showComments, setShowComments] = useState<
    Record<number, boolean>
  >({});

  const [newComment, setNewComment] = useState<
    Record<number, string>
  >({});

  const [commentError, setCommentError] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [deleting, setDeleting] = useState<number | null>(null);
  const [revision, setRevision] = useState(0);

  const [pesquisa, setPesquisa] = useState("");
  const [buscaRealizada, setBuscaRealizada] = useState("");

  const [visualizacao, setVisualizacao] = useState<
    "produtos" | "usuarios"
  >("produtos");

  const isAdmin = session.user.role === "admin";

  // Busca produtos e usuários de acordo com o perfil autenticado.
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

  // Limpa a pesquisa e volta a exibir todos os registros.
  function limparPesquisa() {
    setPesquisa("");
    setBuscaRealizada("");
    setError("");
    setNotice("");

    if (buscaRealizada === "") {
      setRevision((current) => current + 1);
    }
  }

  // Atualiza os dados da API.
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
        current.filter((item) => item.id !== material.id)
      );

      setNotice(`${material.name} excluído.`);
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setDeleting(null);
    }
  }

  // Busca os comentários de um produto.
  async function loadComments(materialId: number) {
    try {
      setCommentError("");

      const response = await api.get<Comment[]>(
        `/comments/${materialId}`,
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );

      setComments((current) => ({
        ...current,
        [materialId]: response.data,
      }));
    } catch (error) {
      setCommentError(errorMessage(error));
    }
  }

  // Adiciona um comentário.
  async function addComment(materialId: number) {
    const text = newComment[materialId] || "";

    if (text.trim().length < 1) {
      setCommentError("Digite um comentário.");
      return;
    }

    if (text.length > 500) {
      setCommentError(
        "O comentário pode ter no máximo 500 caracteres."
      );
      return;
    }

    try {
      setCommentError("");

      await api.post(
        `/comments/${materialId}`,
        {
          comment: text,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );

      setNewComment((current) => ({
        ...current,
        [materialId]: "",
      }));

      await loadComments(materialId);
    } catch (error) {
      setCommentError(errorMessage(error));
    }
  }

  // Abre ou fecha os comentários de um produto.
  function toggleComments(materialId: number) {
    const isOpen = showComments[materialId];

    setShowComments((current) => ({
      ...current,
      [materialId]: !isOpen,
    }));

    if (!isOpen) {
      loadComments(materialId);
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

      <h1 id="materials-title">Materiais</h1>

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
          ? "Você pode consultar produtos e usuários, excluir materiais e comentar."
          : "Você pode consultar produtos por nome ou categoria e adicionar comentários."}
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
          onChange={(e) => setPesquisa(e.target.value)}
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
          disabled={loading || deleting !== null}
        >
          Pesquisar
        </button>

        <button
          className="secondary"
          onClick={limparPesquisa}
          disabled={
            loading ||
            deleting !== null ||
            (pesquisa === "" && buscaRealizada === "")
          }
        >
          Limpar
        </button>
      </div>

      {/* Separação das visualizações do administrador */}
      {isAdmin && (
        <div className="actions">
          <button
            className="secondary"
            onClick={() => setVisualizacao("produtos")}
            aria-pressed={visualizacao === "produtos"}
          >
            Produtos
          </button>

          <button
            className="secondary"
            onClick={() => setVisualizacao("usuarios")}
            aria-pressed={visualizacao === "usuarios"}
          >
            Usuários
          </button>
        </div>
      )}

      {/* Atualização */}
      <button
        className="secondary"
        disabled={loading || deleting !== null}
        onClick={refresh}
      >
        Atualizar
      </button>

      {/* Mensagens gerais */}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {notice && (
        <p className="success" role="status">
          {notice}
        </p>
      )}

      {/* Conteúdo */}
      {loading ? (
        <p role="status">Carregando...</p>
      ) : (
        <>
          {/* PRODUTOS */}
          {visualizacao === "produtos" && (
            <>
              <h2>Produtos</h2>

              {materials.length > 0 ? (
                <ul className="materials">
                  {materials.map((material) => (
                    <li key={material.id}>
                      <div className="material-header">
                        <span>
                          <strong>{material.name}</strong>
                          {" · "}
                          {material.category}
                        </span>

                        {isAdmin ? (
                          <button
                            className="danger"
                            disabled={deleting !== null}
                            onClick={() => remove(material)}
                          >
                            {deleting === material.id
                              ? "Excluindo..."
                              : "Excluir"}
                          </button>
                        ) : (
                          <span className="muted">
                            Somente leitura
                          </span>
                        )}
                      </div>

                      {/* COMENTÁRIOS */}
                      <div className="comments">
                        <h3>Comentários</h3>

                        <button
                          className="secondary"
                          onClick={() =>
                            toggleComments(material.id)
                          }
                        >
                          {showComments[material.id]
                            ? "Fechar comentários"
                            : "Ver comentários"}
                        </button>

                        {showComments[material.id] && (
                          <>
                            {commentError && (
                              <p
                                className="error"
                                role="alert"
                              >
                                {commentError}
                              </p>
                            )}

                            {comments[material.id]?.length ? (
                              comments[material.id].map(
                                (comment) => (
                                  <div
                                    key={comment.id}
                                    className="comment"
                                  >
                                    <strong>
                                      {comment.user_name}
                                    </strong>

                                    <p>{comment.comment}</p>

                                    <small className="muted">
                                      {comment.created_at
                                        ? new Date(
                                            comment.created_at
                                          ).toLocaleString("pt-BR")
                                        : ""}
                                    </small>
                                  </div>
                                )
                              )
                            ) : (
                              <p className="muted">
                                Nenhum comentário encontrado.
                              </p>
                            )}

                            <textarea
                              value={
                                newComment[material.id] || ""
                              }
                              onChange={(e) =>
                                setNewComment((current) => ({
                                  ...current,
                                  [material.id]: e.target.value,
                                }))
                              }
                              maxLength={500}
                              placeholder="Digite seu comentário..."
                              aria-label={`Comentário para ${material.name}`}
                            />

                            <p className="muted">
                              {(newComment[material.id] || "")
                                .length}
                              /500
                            </p>

                            <button
                              onClick={() =>
                                addComment(material.id)
                              }
                            >
                              Comentar
                            </button>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">
                  Nenhum produto encontrado.
                </p>
              )}
            </>
          )}

          {/* USUÁRIOS: somente administrador */}
          {isAdmin && visualizacao === "usuarios" && (
            <>
              <h2>Usuários</h2>

              {users.length > 0 ? (
                <ul className="materials">
                  {users.map((user) => (
                    <li key={user.id}>
                      <span>
                        <strong>{user.name}</strong>
                        {" · "}
                        {user.email}
                        {" · "}
                        <span className="muted">
                          {user.role === "admin"
                            ? "Administrador"
                            : "Usuário"}
                        </span>
                      </span>
                    </li>
                  ))}
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
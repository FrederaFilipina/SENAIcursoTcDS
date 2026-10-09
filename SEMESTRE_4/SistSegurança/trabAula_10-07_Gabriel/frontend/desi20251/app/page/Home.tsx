"use client";

import { useEffect, useState } from "react";
import { api, errorMessage } from "../services/api";
import type { Session } from "../services/login";

// Campos devolvidos por GET /materials.
type Material = { id: number; name: string; category: string };
type Props = { session: Session; onLogout: () => void };
type Comment = { id: number; comment: string; created_at: string; user_name: string; };

export default function Home({ session, onLogout }: Props) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const [commentError, setCommentError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);
  const [revision, setRevision] = useState(0);
  const isAdmin = session.user.role === "admin";

  // Busca os materiais ao entrar e quando Atualizar muda revision.
  useEffect(() => {
    // Não atualiza esta tela caso o usuário saia antes da resposta.
    let active = true;
    async function loadMaterials() {
      try {
        const response = await api.get<Material[]>("/materials", {
          // O token identifica o usuário nas rotas protegidas.
          headers: { Authorization: `Bearer ${session.token}` },
        });
        if (active) setMaterials(response.data);
      } catch (error) {
        if (active) setError(errorMessage(error));
      } finally {
        if (active) setLoading(false);
      }
    }
    loadMaterials();
    return () => { active = false; };
  }, [session.token, revision]);

  function refresh() {
    setLoading(true);
    setError("");
    setNotice("");
    setRevision(current => current + 1);
  }

  async function remove(material: Material) {
    if (!window.confirm(`Excluir ${material.name} do banco de dados?`)) return;
    setDeleting(material.id);
    setError("");
    setNotice("");
    try {
      // A API confere a role antes de excluir, mesmo se a tela for alterada.
      await api.delete(`/materials/${material.id}`, {
        headers: { Authorization: `Bearer ${session.token}` },
      });
      // Só remove da tela depois que a API confirma a exclusão (HTTP 204).
      setMaterials(current => current.filter(item => item.id !== material.id));
      setNotice(`${material.name} excluído.`);
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setDeleting(null);
    }
  }

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

      setComments(current => ({
        ...current,
        [materialId]: response.data,
      }));
    } catch (error) {
      setCommentError(errorMessage(error));
    }
  }

  async function addComment(materialId: number) {
    const text = newComment[materialId] || "";

    if (text.trim().length < 1) {
      setCommentError("Digite um comentário.");
      return;
    }

    if (text.length > 500) {
      setCommentError("O comentário pode ter no máximo 500 caracteres.");
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

      setNewComment(current => ({
        ...current,
        [materialId]: "",
      }));

      await loadComments(materialId);

    } catch (error) {
      setCommentError(errorMessage(error));
    }
  }

  return (
    <section className="panel" aria-labelledby="materials-title">
      <div className="actions">
        <p><strong>{session.user.name}</strong> · {session.user.email}</p>
        <button className="secondary" onClick={onLogout}>Sair</button>
      </div>
      <h1 id="materials-title">Materiais</h1>
      <p>Perfil: <strong>{isAdmin ? "Administrador (admin)" : "Usuário comum (user)"}</strong></p>
      <p>{isAdmin ? "Você pode consultar e excluir materiais." : "Você pode apenas consultar os materiais."}</p>
      <p className="muted">Para comparar os perfis, saia e entre com a outra conta.</p>
      <button className="secondary" disabled={loading || deleting !== null} onClick={refresh}>
        Atualizar materiais
      </button>
      {error && <p className="error" role="alert">{error}</p>}
      {notice && <p className="success" role="status">{notice}</p>}
      {loading ? (
        <p role="status">Carregando materiais...</p>
      ) : (
        <ul className="materials">
          {materials.map(material => (
            <li key={material.id}>
              <div className="material-header">
                <span>
                  <strong>{material.name}</strong> · {material.category}
                </span>

                {isAdmin ? (
                  <button
                    className="danger"
                    disabled={deleting !== null}
                    onClick={() => remove(material)}
                  >
                    {deleting === material.id ? "Excluindo..." : "Excluir"}
                  </button>
                ) : (
                  <span className="muted">Somente leitura</span>
                )}
              </div>

              <div className="comments">

                <h3>Comentários</h3>

                {commentError && (
                  <p className="error" role="alert">
                    {commentError}
                  </p>
                )}

                <button
                  className="secondary"
                  onClick={() => {
                    const isOpen = showComments[material.id];

                    setShowComments(current => ({
                      ...current,
                      [material.id]: !isOpen,
                    }));

                    if (!isOpen) {
                      loadComments(material.id);
                    }
                  }}
                >
                  {showComments[material.id]
                    ? "Fechar comentários"
                    : "Ver comentários"}
                </button>

                {showComments[material.id] && (
                  <>
                    {comments[material.id]?.map(comment => (
                      <div key={comment.id} className="comment">
                        <strong>{comment.user_name}</strong>
                        <p>{comment.comment}</p>
                      </div>
                    ))}

                    <textarea
                      value={newComment[material.id] || ""}
                      onChange={event =>
                        setNewComment(current => ({
                          ...current,
                          [material.id]: event.target.value,
                        }))
                      }
                      maxLength={500}
                      placeholder="Digite seu comentário..."
                    />

                    <p className="muted">
                      {(newComment[material.id] || "").length}/500
                    </p>

                    <button onClick={() => addComment(material.id)}>
                      Comentar
                    </button>
                  </>
                )}

              </div>
            </li>
          ))}
        </ul>
      )}
      {!loading && !error && materials.length === 0 && <p>Nenhum material cadastrado.</p>}
    </section>
  );
}

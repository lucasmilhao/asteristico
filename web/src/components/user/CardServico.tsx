import { useEffect, useRef, useState } from "react";

import Avatar from "./Avatar";
import { formatarPreco } from "./utils";
import type { Servico, Usuario } from "./types";

import "./CardServico.css";
import { useUsuarioLogado } from "../../hooks/usuario/useUsuarioLogado";
import { useServicoDelete } from "../../hooks/servico/useServicoDelete";
import { CadastrarServico } from "../servico/FormularioServico";

interface CardServicoProps {
  servico: Servico;
  onVerPerfil?: (usuario: Usuario) => void;
  onInteresse?: (servico: Servico) => void;

  /** Em listas dentro do próprio perfil, o autor já está no cabeçalho. */
  mostrarUsuario?: boolean;

  /** Define se o usuário atual pode editar/excluir este serviço. */
  podeEditar?: boolean;

  /** Chamado ao selecionar "Editar". */
  onEditar?: (servico: Servico) => void;

  /** Chamado ao selecionar "Excluir". */
  onExcluir?: (servico: Servico) => void;
}

export default function CardServico({
  servico,
  onVerPerfil,
  onInteresse,
  mostrarUsuario = true,
}: CardServicoProps) {
  const {
    usuario,
    preco,
    tipoContratacao,
    titulo,
    descricao,
    isDisponivel,
  } = servico;

  const [menuAberto, setMenuAberto] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const tituloId = `servico-titulo-${servico.id}`;
  const menuId = `servico-menu-${servico.id}`;
  const {data : usuarioLogado} = useUsuarioLogado();
  const {mutate : deletar} = useServicoDelete();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!menuAberto) {
      return;
    }

    const handleClickFora = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuAberto(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickFora);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickFora);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuAberto]);


  return (
    <article
      className="card-servico"
      data-disponivel={isDisponivel}
      aria-labelledby={tituloId}
    >
      {usuario.id === usuarioLogado?.id && (
        <div className="card-servico__menu" ref={menuRef}>
          <button
            type="button"
            className="card-servico__menu-btn"
            aria-label={`Ações do serviço ${titulo}`}
            aria-haspopup="menu"
            aria-expanded={menuAberto}
            aria-controls={menuId}
            onClick={() => setMenuAberto((aberto) => !aberto)}
          >
            <span aria-hidden="true">⋮</span>
          </button>

          {menuAberto && (
            <div
              id={menuId}
              className="card-servico__menu-dropdown"
              role="menu"
            >
              <button
                type="button"
                className="card-servico__menu-item"
                role="menuitem"
                onClick={()=>setIsModalOpen(prev => !prev)}
              >
                <span aria-hidden="true">✎</span>
                Editar
              </button>

              <button
                type="button"
                className="card-servico__menu-item card-servico__menu-item--excluir"
                role="menuitem"
                onClick={()=>{deletar(servico?.id ?? "")}}
              >
                <span aria-hidden="true">🗑</span>
                Excluir
              </button>
            </div>
          )}
        </div>
      )}

      {mostrarUsuario && (
        <button
          type="button"
          className="card-servico__autor"
          onClick={() => onVerPerfil?.(usuario)}
          aria-label={`Ver perfil de ${usuario.nomeCompleto}`}
        >
          <Avatar
            nome={usuario.nomeCompleto}
            picture={usuario.picture}
            tamanho={44}
          />

          <span className="card-servico__autor-texto">
            <span className="card-servico__autor-nome">
              {usuario.nomeCompleto}
            </span>

            {usuario.username && (
              <span className="card-servico__autor-user">
                @{usuario.username}
              </span>
            )}
          </span>
        </button>
      )}

      <div className="card-servico__conteudo">
        <h3 id={tituloId} className="card-servico__titulo">
          {titulo}
        </h3>

        <p className="card-servico__descricao">
          {descricao}
        </p>
      </div>

      <div className="card-servico__comercial">
        <span className="card-servico__preco">
          {formatarPreco(preco)}
        </span>

        <span className="card-servico__tipo">
          {tipoContratacao}
        </span>
      </div>

      <div
        className={`card-servico__status ${
          isDisponivel
            ? "card-servico__status--on"
            : "card-servico__status--off"
        }`}
      >
        <span
          className="card-servico__dot"
          aria-hidden="true"
        />

        {isDisponivel ? "Disponível" : "Indisponível"}
      </div>

      <div className="card-servico__acoes">
        {mostrarUsuario && (
          <button
            type="button"
            className="card-servico__btn card-servico__btn--secundario"
            onClick={() => onVerPerfil?.(usuario)}
          >
            Ver perfil
          </button>
        )}

        <button
          type="button"
          className="card-servico__btn card-servico__btn--primario"
          disabled={!isDisponivel}
          onClick={() => onInteresse?.(servico)}
        >
          {isDisponivel
            ? "Tenho interesse"
            : "Indisponível no momento"}
        </button>
        {isModalOpen && <CadastrarServico idUsuario={servico.usuario.id} onClose={()=>setIsModalOpen(prev => !prev)} servico={servico}/>}
      </div>
    </article>
  );
}

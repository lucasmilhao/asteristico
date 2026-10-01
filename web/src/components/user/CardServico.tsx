import Avatar from "./Avatar";
import { formatarEnum, formatarPreco } from "./utils";
import type { Servico, Usuario } from "./types";
import "./CardServico.css";

interface CardServicoProps {
  servico: Servico;
  onVerPerfil?: (usuario: Usuario) => void;
  onInteresse?: (servico: Servico) => void;
  /** Em listas dentro do próprio perfil, o autor já está no cabeçalho. */
  mostrarUsuario?: boolean;
}

export default function CardServico({
  servico,
  onVerPerfil,
  onInteresse,
  mostrarUsuario = true,
}: CardServicoProps) {
  const { usuario, preco, tipoContratacao, titulo, descricao, isDisponivel } = servico;
  const tituloId = `servico-titulo-${servico.id}`;

  return (
    <article className="card-servico" data-disponivel={isDisponivel} aria-labelledby={tituloId}>
      {mostrarUsuario && (
        <button
          type="button"
          className="card-servico__autor"
          onClick={() => onVerPerfil?.(usuario)}
          aria-label={`Ver perfil de ${usuario.nomeCompleto}`}
        >
          <Avatar nome={usuario.nomeCompleto} picture={usuario.picture} tamanho={44} />
          <span className="card-servico__autor-texto">
            <span className="card-servico__autor-nome">{usuario.nomeCompleto}</span>
            {usuario.username && (
              <span className="card-servico__autor-user">@{usuario.username}</span>
            )}
          </span>
        </button>
      )}

      <div className="card-servico__conteudo">
        <h3 id={tituloId} className="card-servico__titulo">
          {titulo}
        </h3>
        <p className="card-servico__descricao">{descricao}</p>
      </div>

      <div className="card-servico__comercial">
        <span className="card-servico__preco">{formatarPreco(preco)}</span>
        <span className="card-servico__tipo">{formatarEnum(tipoContratacao)}</span>
      </div>

      <div
        className={`card-servico__status ${
          isDisponivel ? "card-servico__status--on" : "card-servico__status--off"
        }`}
      >
        <span className="card-servico__dot" aria-hidden="true" />
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
          {isDisponivel ? "Tenho interesse" : "Indisponível no momento"}
        </button>
      </div>
    </article>
  );
}

import Avatar from "./Avatar";
import { formatarEnum } from "./utils";
import type { Usuario } from "./types";

interface PerfilHeaderProps {
  usuario: Usuario;
  /** Só renderiza o botão "Seguir" se a função for passada. */
  onSeguir?: () => void;
  onContato?: (usuario: Usuario) => void;
}

export default function PerfilHeader({ usuario, onSeguir, onContato }: PerfilHeaderProps) {
  const { nomeCompleto, username, area, bio, localizacao, isDisponivel, picture } = usuario;

  return (
    <header className="perfil-header">
      <div className={`perfil-header__avatar ${isDisponivel ? "perfil-header__avatar--on" : ""}`}>
        <Avatar nome={nomeCompleto} picture={picture} tamanho={128} />
      </div>

      <div className="perfil-header__info">
        <div
          className={`perfil-status ${isDisponivel ? "perfil-status--on" : "perfil-status--off"}`}
        >
          <span className="perfil-status__dot" aria-hidden="true" />
          {isDisponivel ? "Disponível" : "Indisponível"}
        </div>

        <h1 className="perfil-header__nome">{nomeCompleto}</h1>
        {username && <p className="perfil-header__username">@{username}</p>}

        <div className="perfil-header__meta">
          <span className="perfil-badge">{formatarEnum(area)}</span>
          {localizacao && <span className="perfil-header__local">{localizacao}</span>}
        </div>

        {bio && <p className="perfil-header__bio">{bio}</p>}

        <div className="perfil-header__acoes">
          <button
            type="button"
            className="perfil-btn perfil-btn--primario"
            onClick={() => onContato?.(usuario)}
          >
            Entrar em contato
          </button>
          {onSeguir && (
            <button type="button" className="perfil-btn perfil-btn--secundario" onClick={onSeguir}>
              Seguir
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

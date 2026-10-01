import Avatar from "./Avatar";
import { formatarEnum } from "./utils";
import type { Usuario } from "./types";

interface PerfilHeaderProps {
  usuario: Usuario | undefined;
  /** Só renderiza o botão "Seguir" se a função for passada. */
  onSeguir?: () => void;
  onContato?: (usuario: Usuario) => void;
}

export default function PerfilHeader({ usuario, onSeguir, onContato }: PerfilHeaderProps) {

  return (
    <header className="perfil-header">
      <div className={`perfil-header__avatar ${usuario?.isDisponivel ? "perfil-header__avatar--on" : ""}`}>
        <Avatar nome={usuario?.nomeCompleto ?? ""} picture={usuario?.picture ?? ""} tamanho={128} />
      </div>

      <div className="perfil-header__info">
        <div
          className={`perfil-status ${usuario?.isDisponivel ? "perfil-status--on" : "perfil-status--off"}`}
        >
          <span className="perfil-status__dot" aria-hidden="true" />
          {usuario?.isDisponivel ? "Disponível" : "Indisponível"}
        </div>

        <h1 className="perfil-header__nome">{usuario?.nomeCompleto}</h1>
        {usuario?.username && <p className="perfil-header__username">@{usuario?.username}</p>}

        <div className="perfil-header__meta">
          <span className="perfil-badge">{formatarEnum(usuario?.area ?? "")}</span>
          {usuario?.localizacao && <span className="perfil-header__local">{usuario?.localizacao}</span>}
        </div>

        {usuario?.bio && <p className="perfil-header__bio">{usuario?.bio}</p>}

        {usuario && <div className="perfil-header__acoes">
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
        </div>}
      </div>
    </header>
  );
}

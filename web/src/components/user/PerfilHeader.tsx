import Avatar from "./Avatar";
import { formatarEnum } from "./utils";
import { useUsuarioLogado } from "../../hooks/usuario/useUsuarioLogado";
import { useState } from "react";
import { EditarUsuario } from "../modal/EditUsuario";
import { CadastrarServico } from "../servico/FormularioServico";
import type { Usuario } from "./types";

interface PerfilHeaderProps {
  usuario: Usuario | undefined;
  /** Só renderiza o botão "Seguir" se a função for passada. */
  onSeguir?: () => void;
  onContato?: (usuario: Usuario) => void;
}

export default function PerfilHeader({ usuario, onSeguir, onContato }: PerfilHeaderProps) {

  const { data: usuarioLogado } = useUsuarioLogado();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalServicoOpen, setIsModalServicoOpen] = useState(false);


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
          {usuario.id !== usuarioLogado?.id ?
            <button
              type="button"
              className="perfil-btn perfil-btn--primario"
              onClick={() => onContato?.(usuario)}
            >
              Entrar em contato
            </button>
            :
            <div style={{gap: "5px",display:"flex"}}>

              <button
                type="button"
                className="perfil-btn perfil-btn--primario"
                onClick={() => setIsModalOpen(prev => !prev)}
              >
                Editar
              </button>

              <button
                type="button"
                className="perfil-btn perfil-btn--secundario"
                onClick={() => setIsModalServicoOpen(prev => !prev)}
              >
                Serviços
              </button>

            </div>

          }
          {onSeguir && (
            <button type="button" className="perfil-btn perfil-btn--secundario" onClick={onSeguir}>
              Seguir
            </button>
          )}

          {isModalOpen && <EditarUsuario usuario={usuario} onClose={() => setIsModalOpen(prev => !prev)} />}
          {isModalServicoOpen && <CadastrarServico idUsuario={usuario.id ?? ""} onClose={() => setIsModalServicoOpen(prev => !prev)}/>}
        </div>}
      </div>
    </header>
  );
}

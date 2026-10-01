import { useState } from "react";
import "./UserCard.css";

export interface Usuario {
  id: number | string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  area: string; // TypeArea vindo do backend
  isDisponivel: boolean;
  bio : string;
  picture: string | null;
}

interface UserCardProps {
  usuario: Usuario;
  onVerPerfil?: (usuario: Usuario) => void;
}

function getIniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}

// Se o backend enviar o enum em caixa alta (ex.: DESENVOLVIMENTO), exibe em formato de título.
function formatarArea(area: string): string {
  const texto = area.replace(/_/g, " ").toLowerCase();
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function IconeEmail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="user-card__icon">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
    </svg>
  );
}

function IconeTelefone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="user-card__icon">
      <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function IconeSeta() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="user-card__arrow">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function UserCard({ usuario, onVerPerfil }: UserCardProps) {
  const { nomeCompleto, email, telefone, area, isDisponivel, picture } = usuario;
  const [imagemFalhou, setImagemFalhou] = useState(false);
  const mostrarFoto = Boolean(picture) && !imagemFalhou;
  const telefoneLimpo = telefone.replace(/[^\d+]/g, "");

  return (
    <article className="user-card" data-disponivel={isDisponivel}>
      <div
        className={`user-card__status ${
          isDisponivel ? "user-card__status--on" : "user-card__status--off"
        }`}
      >
        <span className="user-card__dot" aria-hidden="true" />
        {isDisponivel ? "Disponível" : "Indisponível"}
      </div>

      <div className="user-card__avatar">
        {mostrarFoto ? (
          <img
            src={picture as string}
            alt={`Foto de ${nomeCompleto}`}
            className="user-card__photo"
            loading="lazy"
            onError={() => setImagemFalhou(true)}
          />
        ) : (
          <span className="user-card__initials" role="img" aria-label={`Avatar de ${nomeCompleto}`}>
            {getIniciais(nomeCompleto)}
          </span>
        )}
      </div>

      <div className="user-card__identity">
        <h3 className="user-card__name">{nomeCompleto}</h3>
        {/* data-area permite estilizar cada TypeArea no futuro, sem mexer no DTO */}
        <span className="user-card__area" data-area={area}>
          {formatarArea(area)}
        </span>
      </div>

      <ul className="user-card__contacts">
        <li>
          <a href={`mailto:${email}`} className="user-card__contact">
            <IconeEmail />
            <span>{email}</span>
          </a>
        </li>
        <li>
          <a href={`tel:${telefoneLimpo}`} className="user-card__contact">
            <IconeTelefone />
            <span>{telefone}</span>
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="user-card__cta"
        onClick={() => onVerPerfil?.(usuario)}
      >
        Ver perfil
        <IconeSeta />
      </button>
    </article>
  );
}
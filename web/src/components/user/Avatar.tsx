import { useState, type CSSProperties } from "react";
import { getIniciais } from "./utils";
import "./Avatar.css";

interface AvatarProps {
  nome: string;
  picture: string | null;
  tamanho?: number; // px
}

export default function Avatar({ nome, picture, tamanho = 48 }: AvatarProps) {
  const [falhou, setFalhou] = useState(false);
  const style = { "--avatar-size": `${tamanho}px` } as CSSProperties;

  if (picture && !falhou) {
    return (
      <img
        className="avatar avatar--foto"
        style={style}
        src={picture}
        alt={`Foto de ${nome}`}
        loading="lazy"
        onError={() => setFalhou(true)}
      />
    );
  }

  return (
    <span className="avatar avatar--iniciais" style={style} role="img" aria-label={`Avatar de ${nome}`}>
      {getIniciais(nome)}
    </span>
  );
}

import { formatarEnum } from "./utils";
import type { Usuario } from "./types";

interface InformacoesUsuarioProps {
  usuario: Usuario | undefined;
}

// Apenas dados públicos. Nada de senha ou campos internos do sistema.
export default function InformacoesUsuario({ usuario }: InformacoesUsuarioProps) {
  const itens = [
    { rotulo: "Área", valor: formatarEnum(usuario?.area ?? ""), href: undefined },
    usuario?.localizacao && { rotulo: "Localização", valor: usuario?.localizacao, href: undefined },
    { rotulo: "Email", valor: usuario?.email, href: `mailto:${usuario?.email}` },
    {
      rotulo: "Telefone",
      valor: usuario?.telefone,
      href: `tel:${usuario?.telefone.replace(/[^\d+]/g, "")}`,
    },
  ].filter(Boolean) as { rotulo: string; valor: string; href?: string }[];

  return (
    <section className="perfil-secao" aria-labelledby="perfil-info-titulo">
      <h2 id="perfil-info-titulo" className="perfil-secao__titulo">
        Informações
      </h2>
      <dl className="perfil-info">
        {itens.map(({ rotulo, valor, href }) => (
          <div key={rotulo} className="perfil-info__item">
            <dt>{rotulo}</dt>
            <dd>{href ? <a href={href}>{valor}</a> : valor}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

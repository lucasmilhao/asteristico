import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PerfilHeader from "./PerfilHeader";
import InformacoesUsuario from "./InformacoesUsuario";
import ListaServicos from "./ListaServicos";
import type { Servico, Usuario } from "./types";
import "./PerfilUsuario.css";
import { useUsuarioDataId } from "../../hooks/usuario/useUsuarioDataId";
import { useServicoUsuario } from "../../hooks/servico/useServicoUsuario";


export default function PerfilUsuario() {
  const { id } = useParams();
  const {data : usuario, isPending} = useUsuarioDataId(id);
  const {data : servicos} = useServicoUsuario(id);
  

  function contatar(alvo: Usuario, assunto?: string) {
    const query = assunto ? `?subject=${encodeURIComponent(assunto)}` : "";
    window.location.href = `mailto:${alvo.email}${query}`;
  }

  if (isPending) {
    return <p className="perfil-mensagem">Carregando perfil…</p>;
  }

  // if (estado === "erro" || !usuario) {
  //   return (
  //     <p className="perfil-mensagem">
  //       Não foi possível carregar este perfil. Tente novamente em instantes.
  //     </p>
  //   );
  // }

  return (
    <main className="perfil">
      <PerfilHeader usuario={usuario} onContato={(u) => contatar(u)} />
      <InformacoesUsuario usuario={usuario} />
      <ListaServicos
        usuario={usuario}
        servicos={servicos}
        onInteresse={(s) => contatar(s.usuario, `Interesse em: ${s.titulo}`)}
      />
    </main>
  );
}

import CardServico from "./CardServico";
import { primeiroNome } from "./utils";
import type { Servico, Usuario } from "./types";

interface ListaServicosProps {
  usuario: Usuario | undefined;
  servicos: Servico[] | undefined;
  onInteresse?: (servico: Servico) => void;
}

export default function ListaServicos({ usuario, servicos, onInteresse }: ListaServicosProps) {
  return (
    <section className="perfil-secao" aria-labelledby="perfil-servicos-titulo">
      <div className="perfil-secao__cabecalho">
        <h2 id="perfil-servicos-titulo" className="perfil-secao__titulo">
          Serviços oferecidos
        </h2>
        <span className="perfil-secao__contagem">
          {servicos?.length} {servicos?.length === 1 ? "serviço" : "serviços"} de{" "}
          {primeiroNome(usuario?.nomeCompleto ?? "")}
        </span>
      </div>

      {servicos?.length === 0 ? (
        <p className="perfil-vazio">
          {primeiroNome(usuario?.nomeCompleto ?? "")} ainda não tem serviços disponíveis.
        </p>
      ) : (
        <ul className="perfil-grade">
          {servicos?.map((servico) => (
            <li key={servico.id}>
              {/* Mesmo CardServico do resto do app; o autor já está no cabeçalho do perfil */}
              <CardServico servico={servico} mostrarUsuario={false} onInteresse={onInteresse} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

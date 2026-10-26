import type { TypeArea } from "../../pages/cadastro/Cadastro";
import type { TypeContratacao } from "../servico/FormularioServico";

export interface Usuario {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  area: string | TypeArea; // TypeArea
  isDisponivel: boolean;
  picture: string | null;
  // Opcionais: só aparecem na interface se o backend enviar
  username?: string;
  bio?: string;
  localizacao?: string;
}

export interface Servico {
  id: string;
  usuario: Usuario;
  preco: number;
  tipoContratacao: TypeContratacao;
  titulo: string;
  descricao: string;
  isDisponivel: boolean;
}

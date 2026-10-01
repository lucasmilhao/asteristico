export interface Usuario {
  id: number | string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  area: string; // TypeArea
  isDisponivel: boolean;
  picture: string | null;
  // Opcionais: só aparecem na interface se o backend enviar
  username?: string;
  bio?: string;
  localizacao?: string;
}

export interface Servico {
  id: number | string;
  usuario: Usuario;
  preco: number;
  tipoContratacao: string;
  titulo: string;
  descricao: string;
  isDisponivel: boolean;
}

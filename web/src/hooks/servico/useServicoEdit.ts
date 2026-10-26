import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api";
import type { TypeContratacao } from "../../components/servico/FormularioServico";

interface ServicoIdProps {
    idServico : string;
    idUsuario : string;
    preco: number;
    tipoContratacao: TypeContratacao | "";
    titulo: string;
    descricao: string;
    isDisponivel: boolean;
}

const fetchData = async (data : ServicoIdProps)  => {
    const response = api.put(`/servico/${data.idServico}`, data);

    return response;
} 


export function useServicoEdit(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchData, 
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["servico-data"]})
        }
    })
}
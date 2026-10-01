import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api";
import type { TypeContratacao } from "../../components/servico/FormularioServico";

interface ServicoProps {
    idUsuario : string;
    preco: number;
    tipoContratacao: TypeContratacao | "";
    titulo: string;
    descricao: string;
    isDisponivel: boolean;
}

const fetchData = async (data : ServicoProps)  => {
    const response = api.post(`/servico`, data);

    return response;
} 


export function useServicoCreate(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchData, 
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["servico-data"]})
        }
    })
}
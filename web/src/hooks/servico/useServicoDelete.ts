import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api";

const fetchData = async (idServico : string)  => {
    const response = api.delete(`/servico/${idServico}`);

    return response;
} 


export function useServicoDelete(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchData, 
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["servico-data"]})
        }
    })
}
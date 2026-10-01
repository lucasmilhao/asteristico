import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api";

interface EditProps {
    id: string;
    data: FormData;
}

const fetchData = async ({id, data} : EditProps)  => {
    const response = api.put(`/usuarios/${id}`, data);

    return response;
} 


export function useUsuarioUpdate(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchData, 
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["usuario-data"]})
        },
        onError: (error: any) => {
            console.log(error);
            
        }
    })
}
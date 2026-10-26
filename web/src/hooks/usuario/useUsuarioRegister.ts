import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../service/api";
import { useNavigate } from "react-router-dom";


const fetchData = async (data : FormData)  => {
    const response = api.post(`/auth/register`, data);

    return response;
} 


export function useUsuarioRegister(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchData, 
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["usuario-data"]})
            navigate("/");
        }
    })
}
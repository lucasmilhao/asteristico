import { useQuery } from "@tanstack/react-query";
import { api } from "../../service/api";
import type { Usuario } from "../../components/user/types";

const fetchData = async () : Promise<Usuario[]> => {
    const response = await api.get("/usuarios");

    return  response.data;
}

export function useUsuarioData() {

    return useQuery({
        queryFn: () => fetchData(),
        queryKey: ["usuario-data"],
        retry: 2
    });
}
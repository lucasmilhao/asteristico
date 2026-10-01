import { useQuery } from "@tanstack/react-query";
import type { Usuario } from "../../components/usuario-card/UserCard";
import { api } from "../../service/api";

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
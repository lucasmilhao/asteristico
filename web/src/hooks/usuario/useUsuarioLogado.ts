import {useQuery} from "@tanstack/react-query";
import { api } from "../../service/api";
import type { Usuario } from "../../components/usuario-card/UserCard";

const fetchdata = async () : Promise<Usuario> => {
    const response = await api.get(`/usuarios/me`);

    return response.data;
}

export function useUsuarioLogado() {

    return useQuery({
        queryFn: fetchdata,
        queryKey: ["usuario-logado-data"],
        retry: 2
    });
}
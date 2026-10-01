import {useQuery} from "@tanstack/react-query";
import { api } from "../../service/api";
import type { Usuario } from "../../components/usuario-card/UserCard";


const fetchdata = async (idUsuario : string | undefined) : Promise<Usuario> => {
    const response = await api.get(`/usuarios/${idUsuario}`);

    return response.data;
}

export function useUsuarioDataId(idUsuario : string | undefined) {

    return useQuery({
        queryFn: () => fetchdata(idUsuario),
        queryKey: ["usuario-id-data", idUsuario],
        retry: 2
    });
}
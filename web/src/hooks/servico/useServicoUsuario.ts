import {useQuery} from "@tanstack/react-query";
import { api } from "../../service/api";
import type { Usuario } from "../../components/usuario-card/UserCard";
import type { Servico } from "../../components/user/types";


const fetchdata = async (idUsuario : string | undefined) : Promise<Servico[]> => {
    const response = await api.get(`/servico/${idUsuario}`);

    return response.data;
}

export function useServicoUsuario(idUsuario : string | undefined) {

    return useQuery({
        queryFn: () => fetchdata(idUsuario),
        queryKey: ["servico-id-data", idUsuario],
        retry: 2
    });
}
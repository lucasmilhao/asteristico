import {
    type ChangeEvent,
    type FormEvent,
    useEffect,
    useId,
    useState,
} from "react";


import "./EditUsuario.css";
import { areas, type TypeArea } from "../../pages/cadastro/Cadastro";
import { useUsuarioUpdate } from "../../hooks/usuario/useUsuarioUpdate";
import type { Usuario } from "../user/types";

interface EditarUsuarioProps {
    usuario: Usuario | undefined;
    onClose: () => void;
}

interface Formulario {
    nomeCompleto: string;
    email: string;
    telefone: string;
    bio: string;
    area: TypeArea | "";
    foto: File | null;
}

const MAX_FOTO_SIZE = 5 * 1024 * 1024;

const TIPOS_FOTO_PERMITIDOS = [
    "image/png",
    "image/jpeg",
    "image/webp",
];

export function EditarUsuario({
    usuario,
    onClose,
}: EditarUsuarioProps) {
    const tituloId = useId();
    const nomeId = useId();
    const emailId = useId();
    const telefoneId = useId();
    const bioId = useId();
    const areaId = useId();
    const fotoId = useId();

    const [form, setForm] = useState<Formulario>({
        nomeCompleto: usuario?.nomeCompleto ?? "",
        email: usuario?.email ?? "",
        telefone: usuario?.telefone ?? "",
        bio: usuario?.bio ?? "",
        area: usuario?.area ? (usuario.area as TypeArea) : "",
        foto: null,
    });

    const [fotoPreview, setFotoPreview] = useState<string | null>(
        usuario?.picture ?? null,
    );

    const [erro, setErro] = useState("");

    const { mutate: atualizar, isPending } = useUsuarioUpdate();


    useEffect(() => {
        setForm({
            nomeCompleto: usuario?.nomeCompleto ?? "",
            email: usuario?.email ?? "",
            telefone: usuario?.telefone ?? "",
            bio: usuario?.bio ?? "",
            area: usuario?.area ? (usuario.area as TypeArea) : "",
            foto: null,
        });

        setFotoPreview(usuario?.picture ?? null);
        setErro("");
    }, [usuario]);

    useEffect(() => {
        if (!form.foto) {
            return;
        }

        const previewUrl = URL.createObjectURL(form.foto);

        setFotoPreview(previewUrl);

        return () => {
            URL.revokeObjectURL(previewUrl);
        };
    }, [form.foto]);

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (erro) {
            setErro("");
        }
    };

    const handleFotoChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const arquivo = event.target.files?.[0] ?? null;

        if (!arquivo) {
            return;
        }

        if (!TIPOS_FOTO_PERMITIDOS.includes(arquivo.type)) {
            setErro("A foto deve estar no formato PNG, JPEG ou WebP.");
            event.target.value = "";
            return;
        }

        if (arquivo.size > MAX_FOTO_SIZE) {
            setErro("A foto deve ter no máximo 5 MB.");
            event.target.value = "";
            return;
        }

        setErro("");

        setForm((prev) => ({
            ...prev,
            foto: arquivo,
        }));
    };

    const validar = (): boolean => {
        if (!form.nomeCompleto.trim()) {
            setErro("Informe o nome completo.");
            return false;
        }

        if (!form.email.trim()) {
            setErro("Informe o email.");
            return false;
        }

        if (!form.telefone.trim()) {
            setErro("Informe o telefone.");
            return false;
        }

        if (!form.area) {
            setErro("Selecione uma área de atuação.");
            return false;
        }

        if (form.foto) {
            if (!TIPOS_FOTO_PERMITIDOS.includes(form.foto.type)) {
                setErro("A foto deve estar no formato PNG, JPEG ou WebP.");
                return false;
            }

            if (form.foto.size > MAX_FOTO_SIZE) {
                setErro("A foto deve ter no máximo 5 MB.");
                return false;
            }
        }

        return true;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isPending || !validar()) {
            return;
        }

        const dados = new FormData();

        dados.append("nomeCompleto", form.nomeCompleto.trim());
        dados.append("email", form.email.trim());
        dados.append("telefone", form.telefone.trim());
        dados.append("bio", form.bio.trim());
        dados.append("area", form.area);

        if (form.foto) {
            dados.append("foto", form.foto);
        }

        atualizar({
            id: usuario?.id ?? "",
            data: dados,
        }, {
            onSuccess: () => onClose()
        });
    };

    return (
        <div className="editar-usuario">
            <div className="editar-usuario__overlay">
                <section
                    className="editar-usuario__modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={tituloId}
                >
                    <header className="editar-usuario__header">
                        <div>
                            <h2
                                id={tituloId}
                                className="editar-usuario__titulo"
                            >
                                Editar perfil
                            </h2>

                            <p className="editar-usuario__descricao">
                                Atualize os dados do seu perfil quando quiser.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="editar-usuario__fechar"
                            aria-label="Fechar"
                            onClick={onClose}
                            disabled={isPending}
                        >
                            ×
                        </button>
                    </header>

                    <form
                        className="editar-usuario__form"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className="editar-usuario__foto">
                            <label
                                htmlFor={fotoId}
                                className="editar-usuario__foto-label"
                            >
                                Foto de perfil
                            </label>

                            <div className="editar-usuario__foto-content">
                                <div className="editar-usuario__avatar">
                                    {fotoPreview ? (
                                        <img
                                            src={fotoPreview}
                                            alt="Pré-visualização da foto de perfil"
                                        />
                                    ) : (
                                        <span aria-hidden="true">
                                            {form.nomeCompleto
                                                .trim()
                                                .charAt(0)
                                                .toUpperCase() || "U"}
                                        </span>
                                    )}
                                </div>

                                <div className="editar-usuario__foto-info">
                                    <input
                                        id={fotoId}
                                        name="foto"
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        onChange={handleFotoChange}
                                        disabled={isPending}
                                    />

                                    <p>
                                        PNG, JPEG ou WebP. Tamanho máximo de
                                        5 MB.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="editar-usuario__campos">
                            <div className="editar-usuario__campo">
                                <label htmlFor={nomeId}>
                                    Nome completo
                                </label>

                                <input
                                    id={nomeId}
                                    name="nomeCompleto"
                                    type="text"
                                    autoComplete="name"
                                    value={form.nomeCompleto}
                                    onChange={handleChange}
                                    disabled={isPending}
                                    required
                                />
                            </div>

                            <div className="editar-usuario__campo">
                                <label htmlFor={emailId}>
                                    Email
                                </label>

                                <input
                                    id={emailId}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    disabled={isPending}
                                    required
                                />
                            </div>

                            <div className="editar-usuario__campo">
                                <label htmlFor={telefoneId}>
                                    Telefone
                                </label>

                                <input
                                    id={telefoneId}
                                    name="telefone"
                                    type="tel"
                                    autoComplete="tel"
                                    value={form.telefone}
                                    onChange={handleChange}
                                    disabled={isPending}
                                    required
                                />
                            </div>

                            <div className="editar-usuario__campo editar-usuario__campo--full">
                                <label htmlFor={bioId}>
                                    Bio
                                </label>

                                <textarea
                                    id={bioId}
                                    name="bio"
                                    autoComplete="off"
                                    value={form.bio}
                                    onChange={handleChange}
                                    disabled={isPending}
                                    rows={5}
                                />
                            </div>

                            <div className="editar-usuario__campo editar-usuario__campo--full">
                                <label htmlFor={areaId}>
                                    Área de atuação
                                </label>

                                <select
                                    id={areaId}
                                    name="area"
                                    autoComplete="organization-title"
                                    value={form.area}
                                    onChange={handleChange}
                                    disabled={isPending}
                                    required
                                >
                                    <option value="">
                                        Selecione uma área
                                    </option>

                                    {areas.map((area: any) => (
                                        <option
                                            key={area.value}
                                            value={area.value}
                                        >
                                            {area.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {erro && (
                            <p
                                className="editar-usuario__erro"
                                role="alert"
                            >
                                {erro}
                            </p>
                        )}

                        <div className="editar-usuario__acoes">
                            <button
                                type="button"
                                className="editar-usuario__botao editar-usuario__botao--cancelar"
                                onClick={onClose}
                                disabled={isPending}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="editar-usuario__botao editar-usuario__botao--salvar"
                                disabled={isPending}
                            >
                                {isPending
                                    ? "Salvando..."
                                    : "Salvar alterações"}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

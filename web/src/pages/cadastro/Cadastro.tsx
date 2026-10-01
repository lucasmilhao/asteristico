import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import "./Cadastro.css";
import { useUsuarioRegister } from "../../hooks/usuario/useUsuarioRegister";

export enum TypeArea {
    FOTOGRAFO = "FOTOGRAFO",
    CAMERA = "CAMERA",
    PRODUTOR = "PRODUTOR",
    DIRETOR = "DIRETOR",
    ROTEIRISTA = "ROTEIRISTA",
    ATOR = "ATOR",
    MUSICO = "MUSICO",
    COMPOSITOR = "COMPOSITOR",
    SONOPLASTIA = "SONOPLASTIA",
    OPERADOR_DE_CAMERA = "OPERADOR_DE_CAMERA",
    DESIGNER = "DESIGNER",
    MAQUIADOR = "MAQUIADOR",
    ILUMINISTA = "ILUMINISTA",
    ILUMINADOR = "ILUMINADOR",
    VFX = "VFX",
    TRADUTOR = "TRADUTOR",
    PENTEADOR = "PENTEADOR",
    VESTURICO = "VESTURICO",
}

interface CadastroForm {
    nomeCompleto: string;
    email: string;
    telefone: string;
    senha: string;
    area: TypeArea | "";
    foto: File | null;
}

export const areas: { value: TypeArea; label: string }[] = [
    { value: TypeArea.FOTOGRAFO, label: "Fotógrafo" },
    { value: TypeArea.CAMERA, label: "Câmera" },
    { value: TypeArea.PRODUTOR, label: "Produtor" },
    { value: TypeArea.DIRETOR, label: "Diretor" },
    { value: TypeArea.ROTEIRISTA, label: "Roteirista" },
    { value: TypeArea.ATOR, label: "Ator" },
    { value: TypeArea.MUSICO, label: "Músico" },
    { value: TypeArea.COMPOSITOR, label: "Compositor" },
    { value: TypeArea.SONOPLASTIA, label: "Sonoplastia" },
    { value: TypeArea.OPERADOR_DE_CAMERA, label: "Operador de câmera" },
    { value: TypeArea.DESIGNER, label: "Designer" },
    { value: TypeArea.MAQUIADOR, label: "Maquiador" },
    { value: TypeArea.ILUMINISTA, label: "Iluminista" },
    { value: TypeArea.ILUMINADOR, label: "Iluminador" },
    { value: TypeArea.VFX, label: "VFX" },
    { value: TypeArea.TRADUTOR, label: "Tradutor" },
    { value: TypeArea.PENTEADOR, label: "Penteador" },
    { value: TypeArea.VESTURICO, label: "Figurinista" },
];

export default function Cadastro() {
    const nomeId = useId();
    const emailId = useId();
    const senhaId = useId();
    const areaId = useId();
    const fotoId = useId();
    const telefoneId = useId();

    const [form, setForm] = useState<CadastroForm>({
        nomeCompleto: "",
        email: "",
        telefone: "",
        senha: "",
        area: "",
        foto: null,
    });

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const {mutate : criar, isPending} = useUsuarioRegister();

    function alterarCampo(
        campo: keyof Omit<CadastroForm, "foto">,
        valor: string
    ) {
        setForm((anterior) => ({
            ...anterior,
            [campo]: valor,
        }));
    }

    function selecionarFoto(evento: ChangeEvent<HTMLInputElement>) {
        const arquivo = evento.target.files?.[0];

        if (!arquivo) return;

        if (!arquivo.type.startsWith("image/")) {
            setErrorMessage("Selecione um arquivo de imagem válido.");
            return;
        }

        if (arquivo.size > 5 * 1024 * 1024) {
            setErrorMessage("A imagem deve ter no máximo 5 MB.");
            return;
        }

        setErrorMessage("");

        setForm((anterior) => ({
            ...anterior,
            foto: arquivo,
        }));

        setPreview(URL.createObjectURL(arquivo));
    }

    function enviar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        if (isPending) return;

        if (!form.area) {
            setErrorMessage("Selecione sua área de atuação.");
            return;
        }

        const dados = new FormData();

        dados.append("nomeCompleto", form.nomeCompleto.trim());
        dados.append("email", form.email.trim());
        dados.append("senha", form.senha);
        dados.append("area", form.area);
        dados.append("telefone", form.telefone);

        if (form.foto) {
            dados.append("foto", form.foto);
        }

        criar(dados);

        console.log("Dados do cadastro:", {
            nomeCompleto: form.nomeCompleto,
            email: form.email,
            senha: form.senha,
            area: form.area,
            foto: form.foto,
        });
    }

    return (
        <main className="cadastro">
            <section className="cadastro__painel">
                <div className="cadastro__marca">
                    <span className="cadastro__asterisco" aria-hidden="true">
                        *
                    </span>

                    <span className="cadastro__marca-nome">
                        Asterístico
                    </span>
                </div>

                <header className="cadastro__cabecalho">
                    <span className="cadastro__eyebrow">
                        CRIE SEU PERFIL
                    </span>

                    <h1 className="cadastro__titulo">
                        Faça parte da comunidade
                    </h1>

                    <p className="cadastro__subtitulo">
                        Crie seu perfil profissional e mostre seu trabalho para
                        pessoas que fazem parte do mesmo universo criativo.
                    </p>
                </header>

                <form
                    className="cadastro__form"
                    onSubmit={enviar}
                    encType="multipart/form-data"
                >
                    {errorMessage && (
                        <p className="cadastro__erro" role="alert">
                            {errorMessage}
                        </p>
                    )}

                    {/* FOTO */}

                    <div className="cadastro__foto-area">
                        <label htmlFor={fotoId} className="cadastro__foto">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Prévia da foto de perfil"
                                    className="cadastro__foto-preview"
                                />
                            ) : (
                                <span className="cadastro__foto-placeholder">
                                    +
                                </span>
                            )}
                        </label>

                        <div className="cadastro__foto-info">
                            <span className="cadastro__label">
                                FOTO DE PERFIL
                            </span>

                            <p>
                                Escolha uma foto para representar seu perfil.
                            </p>

                            <label
                                htmlFor={fotoId}
                                className="cadastro__foto-button"
                            >
                                Escolher foto
                            </label>

                            <input
                                id={fotoId}
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={selecionarFoto}
                                hidden
                            />
                        </div>
                    </div>

                    {/* NOME */}

                    <div className="cadastro__campo">
                        <label htmlFor={nomeId} className="cadastro__label">
                            Nome completo
                        </label>

                        <input
                            id={nomeId}
                            className="cadastro__input"
                            type="text"
                            name="nomeCompleto"
                            placeholder="Seu nome completo"
                            value={form.nomeCompleto}
                            onChange={(e) =>
                                alterarCampo("nomeCompleto", e.target.value)
                            }
                            autoComplete="name"
                            required
                        />
                    </div>

                    {/* EMAIL */}

                    <div className="cadastro__campo">
                        <label htmlFor={emailId} className="cadastro__label">
                            Email
                        </label>

                        <input
                            id={emailId}
                            className="cadastro__input"
                            type="email"
                            name="email"
                            placeholder="voce@email.com"
                            value={form.email}
                            onChange={(e) =>
                                alterarCampo("email", e.target.value)
                            }
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="cadastro__campo">
                        <label htmlFor={telefoneId} className="cadastro__label">
                            Telefone
                        </label>

                        <input
                            id={telefoneId}
                            className="cadastro__input"
                            type="tel"
                            name="telefone"
                            placeholder="(51) 99999-9999"
                            value={form.telefone}
                            onChange={(e) =>
                                alterarCampo("telefone", e.target.value)
                            }
                            autoComplete="tel"
                            required
                        />
                    </div>

                    {/* SENHA */}

                    <div className="cadastro__campo">
                        <label htmlFor={senhaId} className="cadastro__label">
                            Senha
                        </label>

                        <div className="cadastro__senha">
                            <input
                                id={senhaId}
                                className="cadastro__input"
                                type={mostrarSenha ? "text" : "password"}
                                name="senha"
                                placeholder="Crie uma senha"
                                value={form.senha}
                                onChange={(e) =>
                                    alterarCampo("senha", e.target.value)
                                }
                                autoComplete="new-password"
                                required
                                minLength={6}
                            />

                            <button
                                type="button"
                                className="cadastro__mostrar-senha"
                                onClick={() =>
                                    setMostrarSenha((valor) => !valor)
                                }
                            >
                                {mostrarSenha ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                    </div>

                    {/* ÁREA */}

                    <div className="cadastro__campo">
                        <label htmlFor={areaId} className="cadastro__label">
                            Área de atuação
                        </label>

                        <select
                            id={areaId}
                            className="cadastro__select"
                            name="area"
                            value={form.area}
                            onChange={(e) =>
                                alterarCampo("area", e.target.value)
                            }
                            required
                        >
                            <option value="" disabled>
                                Selecione sua área
                            </option>

                            {areas.map((area) => (
                                <option key={area.value} value={area.value}>
                                    {area.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="cadastro__botao"
                        disabled={isPending}
                    >
                        {isPending ? "Criando conta..." : "Criar minha conta"}
                    </button>
                </form>

                <p className="cadastro__rodape">
                    Já possui uma conta?{" "}
                    <a href="/login" className="cadastro__link">
                        Entrar
                    </a>
                </p>
            </section>
        </main>
    );
}
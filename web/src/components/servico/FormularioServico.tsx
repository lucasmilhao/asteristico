import {
    type ChangeEvent,
    type FormEvent,
    useId,
    useState,
} from "react";

import "./CadastrarServico.css";
import { useServicoCreate } from "../../hooks/servico/useServicoCreate";
import type { Servico } from "../user/types";
import { useServicoEdit } from "../../hooks/servico/useServicoEdit";


interface CadastrarServicoProps {
    idUsuario: string;
    servico?: Servico;
    onClose: () => void;
}

export enum TypeContratacao {
    ANO,
    SEMANA,
    MES,
    DIA,
    HORA
}

interface FormularioServico {
    preco: number;
    tipoContratacao: TypeContratacao | "";
    titulo: string;
    descricao: string;
    isDisponivel: boolean;
}

const tiposContratacao = [
    {
        value: TypeContratacao.HORA,
        label: "Hora",
    },
    {
        value: TypeContratacao.DIA,
        label: "Dia",
    },
    {
        value: TypeContratacao.SEMANA,
        label: "Semana",
    },
    {
        value: TypeContratacao.MES,
        label: "Mês",
    },
    {
        value: TypeContratacao.ANO,
        label: "Ano",
    },
];

export function CadastrarServico({
    idUsuario,
    onClose,
    servico
}: CadastrarServicoProps) {
    const tituloId = useId();
    const precoId = useId();
    const contratacaoId = useId();
    const nomeServicoId = useId();
    const descricaoId = useId();
    const disponibilidadeId = useId();

    const [form, setForm] = useState<FormularioServico>({
        preco: servico?.preco ?? 0,
        tipoContratacao: servico?.tipoContratacao ?? "",
        titulo: servico?.titulo ?? "",
        descricao: servico?.descricao ?? "",
        isDisponivel: servico?.isDisponivel ?? true,
    });

    const [erro, setErro] = useState("");

    const {
        mutate: cadastrar,
        isPending,
    } = useServicoCreate();

    const {mutate : editar} = useServicoEdit();

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >,
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

    const handleDisponibilidadeChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        setForm((prev) => ({
            ...prev,
            isDisponivel: event.target.checked,
        }));
    };

    const validar = (): boolean => {
        if (!form.titulo.trim()) {
            setErro("Informe o título do serviço.");
            return false;
        }

        if (!form.preco) {
            setErro("Informe o preço do serviço.");
            return false;
        }

        const preco = Number(form.preco);

        if (!Number.isFinite(preco) || preco <= 0) {
            setErro("O preço deve ser maior que zero.");
            return false;
        }

        if (!form.tipoContratacao) {
            setErro("Selecione o tipo de contratação.");
            return false;
        }

        if (!form.descricao.trim()) {
            setErro("Informe a descrição do serviço.");
            return false;
        }

        return true;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isPending || !validar()) {
            return;
        }

        servico ?

        editar({
            idServico: servico.id,
            idUsuario,
            preco: Number(form.preco),
            tipoContratacao: form.tipoContratacao,
            titulo: form.titulo.trim(),
            descricao: form.descricao.trim(),
            isDisponivel: form.isDisponivel,
        })

        :
        cadastrar({
            idUsuario,
            preco: Number(form.preco),
            tipoContratacao: form.tipoContratacao,
            titulo: form.titulo.trim(),
            descricao: form.descricao.trim(),
            isDisponivel: form.isDisponivel,
        }, {
            onSuccess: () => onClose()
        });
    };

    return (
        <div className="cadastrar-servico">
            <div className="cadastrar-servico__overlay">
                <section
                    className="cadastrar-servico__modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={tituloId}
                >
                    <header className="cadastrar-servico__header">
                        <div>
                            <h2
                                id={tituloId}
                                className="cadastrar-servico__titulo"
                            >
                                Cadastrar serviço
                            </h2>

                            <p className="cadastrar-servico__descricao">
                                Adicione um novo serviço ao seu perfil
                                profissional.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="cadastrar-servico__fechar"
                            aria-label="Fechar"
                            onClick={onClose}
                            disabled={isPending}
                        >
                            ×
                        </button>
                    </header>

                    <form
                        className="cadastrar-servico__form"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className="cadastrar-servico__campos">
                            <div className="cadastrar-servico__campo cadastrar-servico__campo--full">
                                <label htmlFor={nomeServicoId}>
                                    Título do serviço
                                </label>

                                <input
                                    id={nomeServicoId}
                                    name="titulo"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Ex.: Criação de identidade visual"
                                    value={form.titulo}
                                    onChange={handleChange}
                                    disabled={isPending}
                                    required
                                />
                            </div>

                            <div className="cadastrar-servico__campo">
                                <label htmlFor={precoId}>
                                    Preço
                                </label>

                                <div className="cadastrar-servico__preco">
                                    <span aria-hidden="true">
                                        R$
                                    </span>

                                    <input
                                        id={precoId}
                                        name="preco"
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        inputMode="decimal"
                                        autoComplete="off"
                                        placeholder="0,00"
                                        value={form.preco}
                                        onChange={handleChange}
                                        disabled={isPending}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="cadastrar-servico__campo">
                                <label htmlFor={contratacaoId}>
                                    Tipo de contratação
                                </label>

                                <select
                                    id={contratacaoId}
                                    name="tipoContratacao"
                                    autoComplete="off"
                                    value={form.tipoContratacao}
                                    onChange={handleChange}
                                    disabled={isPending}
                                    required
                                >
                                    <option value="">
                                        Selecione
                                    </option>

                                    {tiposContratacao.map((tipo) => (
                                        <option
                                            key={tipo.value}
                                            value={tipo.value}
                                        >
                                            {tipo.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="cadastrar-servico__campo cadastrar-servico__campo--full">
                                <label htmlFor={descricaoId}>
                                    Descrição
                                </label>

                                <textarea
                                    id={descricaoId}
                                    name="descricao"
                                    autoComplete="off"
                                    placeholder="Descreva o que está incluso neste serviço..."
                                    value={form.descricao}
                                    onChange={handleChange}
                                    disabled={isPending}
                                    rows={6}
                                    required
                                />
                            </div>

                            <div className="cadastrar-servico__disponibilidade">
                                <label
                                    htmlFor={disponibilidadeId}
                                    className="cadastrar-servico__switch"
                                >
                                    <input
                                        id={disponibilidadeId}
                                        name="isDisponivel"
                                        type="checkbox"
                                        checked={form.isDisponivel}
                                        onChange={
                                            handleDisponibilidadeChange
                                        }
                                        disabled={isPending}
                                    />

                                    <span className="cadastrar-servico__switch-slider" />

                                    <span className="cadastrar-servico__switch-text">
                                        Serviço disponível para contratação
                                    </span>
                                </label>
                            </div>
                        </div>

                        {erro && (
                            <p
                                className="cadastrar-servico__erro"
                                role="alert"
                            >
                                {erro}
                            </p>
                        )}

                        <div className="cadastrar-servico__acoes">
                            <button
                                type="button"
                                className="cadastrar-servico__botao cadastrar-servico__botao--cancelar"
                                onClick={onClose}
                                disabled={isPending}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="cadastrar-servico__botao cadastrar-servico__botao--salvar"
                                disabled={isPending}
                            >
                                {isPending
                                    ? "Cadastrando..."
                                    : "Cadastrar serviço"}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

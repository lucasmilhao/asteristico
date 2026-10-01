import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserCard from "../../components/usuario-card/UserCard";
import { useUsuarioData } from "../../hooks/usuario/useUsuarios";

import "./Home.css";

export default function Home() {
    const { data: usuarios, isLoading, isError } = useUsuarioData();

    const navigate = useNavigate();
    const [pesquisa, setPesquisa] = useState("");

    const usuariosFiltrados = usuarios?.filter((usuario) => {
        const termo = pesquisa.toLowerCase().trim();

        if (!termo) return true;

        return (
            usuario.nomeCompleto?.toLowerCase().includes(termo) ||
            usuario.email?.toLowerCase().includes(termo) ||
            usuario.area?.toLowerCase().includes(termo)
        );
    });

    return (
        <main className="home">

            <section className="home-hero">
                <div className="home-hero-content">
                    <span className="home-eyebrow">
                        ASTERÍSTICO
                    </span>

                    <h1>
                        Encontre pessoas.
                        <br />
                        <span>Descubra talentos.</span>
                    </h1>

                    <p>
                        Conecte-se com profissionais, descubra novos
                        talentos e encontre pessoas que podem transformar
                        suas ideias em realidade.
                    </p>

                    <div className="home-search">
                        <span className="search-icon">⌕</span>

                        <input
                            type="text"
                            placeholder="Pesquisar por nome, área ou profissional..."
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                        />

                        {pesquisa && (
                            <button
                                className="clear-search"
                                onClick={() => setPesquisa("")}
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                <div className="hero-decoration">
                    <div className="decoration-circle circle-one" />
                    <div className="decoration-circle circle-two" />
                    <div className="decoration-circle circle-three" />

                    <div className="hero-symbol">
                        ✦
                    </div>
                </div>
            </section>

            <section className="home-content">

                <div className="section-header">
                    <div>
                        <span className="section-label">
                            COMUNIDADE
                        </span>

                        <h2>
                            Perfis em destaque
                        </h2>
                    </div>

                    {usuarios && (
                        <span className="users-count">
                            {usuariosFiltrados?.length ?? 0} profissionais
                        </span>
                    )}
                </div>

                {isLoading && (
                    <div className="home-state">
                        <div className="loading-spinner" />
                        <p>Carregando profissionais...</p>
                    </div>
                )}

                {isError && (
                    <div className="home-state error">
                        <span>!</span>

                        <h3>
                            Não foi possível carregar os usuários
                        </h3>

                        <p>
                            Tente novamente em alguns instantes.
                        </p>
                    </div>
                )}

                {!isLoading &&
                    !isError &&
                    usuariosFiltrados?.length === 0 && (
                        <div className="home-state">
                            <div className="empty-icon">
                                ⌕
                            </div>

                            <h3>
                                Nenhum profissional encontrado
                            </h3>

                            <p>
                                Tente pesquisar por outro nome ou área.
                            </p>
                        </div>
                    )}

                {!isLoading &&
                    !isError &&
                    usuariosFiltrados &&
                    usuariosFiltrados.length > 0 && (
                        <div className="users-grid">
                            {usuariosFiltrados.map((usuario) => (
                                <UserCard
                                    key={usuario.id}
                                    usuario={usuario}
                                    onVerPerfil={() =>
                                        navigate(`/user/${usuario.id}`)
                                    }
                                />
                            ))}
                        </div>
                    )}

            </section>

        </main>
    );
}

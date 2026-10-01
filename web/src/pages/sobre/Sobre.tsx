import "./Sobre.css";

export default function Sobre() {
    return (
        <main className="sobre">

            {/* HERO */}

            <section className="sobre-hero">
                <div className="sobre-hero-content">

                    <span className="sobre-eyebrow">
                        SOBRE O ASTERÍSTICO
                    </span>

                    <h1>
                        Onde profissionais
                        <br />
                        <span>ganham vida.</span>
                    </h1>

                    <p>
                        O Asterístico é uma plataforma criada para conectar
                        profissionais do audiovisual, facilitar oportunidades
                        e transformar talentos em projetos.
                    </p>

                </div>

                <div className="sobre-hero-decoration">
                    <div className="film-frame frame-one" />
                    <div className="film-frame frame-two" />
                    <div className="film-frame frame-three" />

                    <div className="camera-symbol">
                        ✦
                    </div>
                </div>
            </section>


            {/* INTRODUÇÃO */}

            <section className="sobre-section sobre-intro">

                <div className="sobre-section-label">
                    NOSSA IDEIA
                </div>

                <div className="sobre-intro-grid">

                    <div>
                        <h2>
                            O audiovisual é feito
                            <br />
                            <span>por pessoas.</span>
                        </h2>
                    </div>

                    <div>
                        <p>
                            Por trás de cada filme, série, comercial, clipe
                            ou produção independente existem dezenas de
                            profissionais trabalhando juntos.
                        </p>

                        <p>
                            O Asterístico nasceu para aproximar essas pessoas,
                            criando um espaço onde profissionais possam
                            apresentar seu trabalho, encontrar oportunidades
                            e construir novas conexões.
                        </p>
                    </div>

                </div>

            </section>


            {/* PROPÓSITO */}

            <section className="sobre-purpose">

                <div className="purpose-content">

                    <span className="sobre-eyebrow">
                        NOSSO PROPÓSITO
                    </span>

                    <h2>
                        Conectar talento,
                        <br />
                        <span>criar possibilidades.</span>
                    </h2>

                    <p>
                        Queremos tornar mais simples encontrar a pessoa certa
                        para cada projeto e, ao mesmo tempo, dar aos
                        profissionais uma maneira de mostrar aquilo que sabem
                        fazer.
                    </p>

                </div>

            </section>


            {/* PROFISSIONAIS */}

            <section className="sobre-section">

                <div className="sobre-section-heading">

                    <div>
                        <span className="sobre-section-label">
                            PARA QUEM É
                        </span>

                        <h2>
                            Um espaço para
                            <br />
                            diferentes talentos.
                        </h2>
                    </div>

                    <p>
                        Do primeiro roteiro à edição final, diferentes
                        profissionais fazem parte de uma produção audiovisual.
                    </p>

                </div>


                <div className="profissionais-grid">

                    <div className="profissional-card">
                        <span>01</span>
                        <h3>Atores</h3>
                        <p>
                            Encontre oportunidades e apresente seu trabalho
                            para novas produções.
                        </p>
                    </div>

                    <div className="profissional-card">
                        <span>02</span>
                        <h3>Diretores</h3>
                        <p>
                            Conecte-se com profissionais para transformar
                            ideias em produções.
                        </p>
                    </div>

                    <div className="profissional-card">
                        <span>03</span>
                        <h3>Roteiristas</h3>
                        <p>
                            Apresente seus projetos e encontre pessoas
                            interessadas em novas histórias.
                        </p>
                    </div>

                    <div className="profissional-card">
                        <span>04</span>
                        <h3>Fotógrafos</h3>
                        <p>
                            Mostre seu olhar e encontre projetos que valorizem
                            seu trabalho.
                        </p>
                    </div>

                    <div className="profissional-card">
                        <span>05</span>
                        <h3>Editores</h3>
                        <p>
                            Conecte suas habilidades a produções que precisam
                            de uma boa pós-produção.
                        </p>
                    </div>

                    <div className="profissional-card">
                        <span>06</span>
                        <h3>Produtores</h3>
                        <p>
                            Encontre profissionais e facilite a formação de
                            equipes para seus projetos.
                        </p>
                    </div>

                </div>

            </section>


            {/* COMO FUNCIONA */}

            <section className="sobre-section como-funciona">

                <div className="sobre-section-heading">

                    <div>
                        <span className="sobre-section-label">
                            COMO FUNCIONA
                        </span>

                        <h2>
                            Da conexão
                            <br />
                            ao projeto.
                        </h2>
                    </div>

                </div>


                <div className="steps">

                    <div className="step">
                        <div className="step-number">01</div>

                        <div>
                            <h3>Crie seu perfil</h3>
                            <p>
                                Apresente quem você é, sua área de atuação
                                e suas principais habilidades.
                            </p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">02</div>

                        <div>
                            <h3>Mostre seus serviços</h3>
                            <p>
                                Cadastre os serviços que você oferece e
                                deixe claro como pode contribuir para
                                diferentes projetos.
                            </p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">03</div>

                        <div>
                            <h3>Encontre profissionais</h3>
                            <p>
                                Descubra pessoas com diferentes habilidades
                                e experiências dentro do audiovisual.
                            </p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">04</div>

                        <div>
                            <h3>Crie conexões</h3>
                            <p>
                                Entre em contato, forme equipes e transforme
                                conexões em novos projetos.
                            </p>
                        </div>
                    </div>

                </div>

            </section>


            {/* CTA */}

            <section className="sobre-cta">

                <div>

                    <span className="sobre-eyebrow">
                        ASTERÍSTICO
                    </span>

                    <h2>
                        Seu próximo projeto
                        <br />
                        pode começar aqui.
                    </h2>

                    <p>
                        Crie seu perfil, mostre seu trabalho e conecte-se
                        com profissionais do audiovisual.
                    </p>

                    <button
                        className="sobre-cta-button"
                        onClick={() => window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })}
                    >
                        Começar agora
                        <span>→</span>
                    </button>

                </div>

            </section>

        </main>
    );
}
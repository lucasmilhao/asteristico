import { useId, useState, type FormEvent } from "react";
import "./Login.css";
import { useUsuarioLogin } from "../../hooks/usuario/useUsuarioLogin";

export interface Credenciais {
  email: string;
  senha: string;
}

function IconeEmail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="login__icone">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
    </svg>
  );
}

function IconeCadeado() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="login__icone">
      <rect x="5" y="11" width="14" height="9" rx="2.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function IconeOlho({ aberto }: { aberto: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="login__icone">
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.75" />
      {!aberto && <path d="M4 4l16 16" />}
    </svg>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const {mutate : fazerLogin, isPending, isError} = useUsuarioLogin();

  const errorMessage = "Email ou senha incorretos. Confira os dados e tente novamente.";
  const cadastroHref = "/register";
  const esqueciSenhaHref = "/esqueci-senha";


  const emailId = useId();
  const senhaId = useId();
  const erroId = useId();

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (isPending) return;
    fazerLogin({ email: email.trim(), senha });
  }

  return (
    <main className="login">
      <section className="login__painel" aria-labelledby="login-titulo">
        <div className="login__marca">
          <span className="login__asterisco" aria-hidden="true">
            *
          </span>
          <span className="login__marca-nome">Asterístico</span>
        </div>

        <header className="login__cabecalho">
          <h1 id="login-titulo" className="login__titulo">
            Que bom te ver de volta
          </h1>
        </header>

        <form className="login__form" onSubmit={enviar} noValidate>
          {isError && (
            <p id={erroId} className="login__erro" role="alert">
              {errorMessage}
            </p>
          )}

          <div className="login__campo">
            <label htmlFor={emailId} className="login__label">
              Email
            </label>
            <div className="login__input-wrap">
              <IconeEmail />
              <input
                id={emailId}
                className="login__input"
                type="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={isError}
                aria-describedby={isError ? erroId : undefined}
                required
              />
            </div>
          </div>

          <div className="login__campo">
            <div className="login__linha">
              <label htmlFor={senhaId} className="login__label">
                Senha
              </label>
              <a href={esqueciSenhaHref} className="login__link login__link--discreto">
                Esqueci minha senha
              </a>
            </div>
            <div className="login__input-wrap">
              <IconeCadeado />
              <input
                id={senhaId}
                className="login__input login__input--com-acao"
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                autoComplete="current-password"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                aria-invalid={isError}
                aria-describedby={isError ? erroId : undefined}
                required
              />
              <button
                type="button"
                className="login__olho"
                onClick={() => setMostrarSenha((v) => !v)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={mostrarSenha}
              >
                <IconeOlho aberto={mostrarSenha} />
              </button>
            </div>
          </div>

          <button type="submit" className="login__botao" disabled={isPending} aria-busy={isPending}>
            {isPending && <span className="login__spinner" aria-hidden="true" />}
            {isPending ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p className="login__rodape">
          Ainda não tem conta?{" "}
          <a href={cadastroHref} className="login__link">
            Criar conta
          </a>
        </p>
      </section>
    </main>
  );
}
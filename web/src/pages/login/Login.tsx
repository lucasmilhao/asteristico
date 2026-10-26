import { GoogleLogin } from "@react-oauth/google";
import { useUsuarioLoginGoogle } from "../../hooks/login/useGoogleLogin";
import { useState } from "react";

export default function Login(){
  const [erro, setErro] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("password");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const { mutate: loginGoogle, isPending } = useUsuarioLoginGoogle();

  const togglePassword = () => {
    setMostrarSenha(!mostrarSenha);
    setTipo(mostrarSenha ? "password" : "text");
  };

  const login = (response: string | undefined) => {
    if (response) {
      loginGoogle(response);
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email,
      senha,
    };
  };

  return (
    <div className="login-container">
      <div className="esquerda">
        <form onSubmit={submit}>
          <h1 className="login-title">cubing2gether</h1>
          <div className="input-field">
            <p>Email:</p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>

          <div className="input-field">
            <p>Senha:</p>

            <input
              type={tipo}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
            />

            {erro?.length > 0 && <p>{erro}</p>}
            
            <button
              type="button"
              onClick={togglePassword}
              className="toggle-btn"
            >
              {mostrarSenha ? "🙈" : "🐵"}
            </button>
          </div>

          <GoogleLogin
            context="signin"
            useOneTap
            onSuccess={(e) => {
              login(e.credential);
            }}
            onError={() => { }}
          />

          <button type="submit" className="login-btn">
            {isPending ? "Entrando..." : "Entrar"}
          </button>

          <div className="signup-link">
            Não tem conta?{" "}
            <a href="/auth/register">
              Crie uma aqui
            </a>
          </div>
        </form>
      </div>
      </div>
      );
}
import { Link } from "react-router-dom";
import "./Header.css";
import { useUsuarioLogado } from "../../hooks/usuario/useUsuarioLogado";

function Header() {
  const {data : usuarioLogado, isPending} = useUsuarioLogado();

  return (
    <header className="header">
      <div className="header__container">

        <Link to="/" className="header__logo">
          <span className="header__logo-text">
            ASTERISTIC
          </span>

          <AsteristicoIcon />
        </Link>

        <nav className="header__nav">
          <Link to="/" className="header__link">
            Início
          </Link>

          <Link to="/sobre" className="header__link">
            Sobre
          </Link>

          <Link to="/contato" className="header__link">
            Contato
          </Link>
        </nav>

      {!usuarioLogado &&
        <div className="header__actions">
          <Link to="/login" className="header__login">
            Entrar
          </Link>

          <Link to="/register" className="header__button">
            Começar
          </Link>
        </div>}

        {usuarioLogado && 
          <Link to={`/user/${usuarioLogado.id}`} className="header__button">
            {usuarioLogado.nomeCompleto.split(" ")[0]}
          </Link>}

      </div>
    </header>
  );
}

function AsteristicoIcon() {
  return(
    <svg width="22" height="22" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="1pt" stroke="#C9FE0E" strokeWidth="0.25mm" fill="#C9FE0E" className="asteristico-icon"><path d="M 24.3 11.9 L 33.6 3.5 L 40.3 15.6 L 29.2 19.2 L 40.3 22.6 L 33 35.3 L 24.3 26.7 L 27.1 38.4 L 13.2 38.4 L 16 26.7 L 7.5 35.4 L 0 22.5 L 11.1 18.9 L 0.2 15.7 L 6.9 3.6 L 16.1 11.9 L 13 0 L 27.2 0 L 24.3 11.9 Z" vectorEffect="non-scaling-stroke"/></g></svg>
  );
}


export default Header;
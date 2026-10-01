import "./Contato.css";

export default function Contato() {
return (
<main className="contato">
<section className="contato__hero">
<div className="contato__content">
<span className="contato__eyebrow">ENTRE EM CONTATO</span>

      <h1>
        Vamos criar algo
        <span> incrível.</span>
      </h1>

      <p className="contato__description">
        Tem um projeto em mente, uma oportunidade ou simplesmente quer
        conversar? Estou disponível para novos trabalhos e colaborações.
      </p>

      <div className="contato__grid">
        <a
          href="mailto:lucasmilhao26@gmail.com"
          className="contato__card"
        >
          <div className="contato__icon">@</div>

          <div>
            <span className="contato__label">E-MAIL</span>
            <strong>lucasmilhao26@gmail.com</strong>
          </div>

          <span className="contato__arrow">↗</span>
        </a>

        <a
          href="tel:+5551985732879"
          className="contato__card"
        >
          <div className="contato__icon">☎</div>

          <div>
            <span className="contato__label">TELEFONE</span>
            <strong>+55 (51) 98573-2879</strong>
          </div>

          <span className="contato__arrow">↗</span>
        </a>

        <a
          href="https://www.linkedin.com/in/lucas-villarinho-milh%C3%A3o-a63a1135a/"
          target="_blank"
          rel="noreferrer"
          className="contato__card"
        >
          <div className="contato__icon">in</div>

          <div>
            <span className="contato__label">LINKEDIN</span>
            <strong>linkedin.com/in/lucas</strong>
          </div>

          <span className="contato__arrow">↗</span>
        </a>

        <a
          href="https://www.instagram.com/luck4s.villa/"
          target="_blank"
          rel="noreferrer"
          className="contato__card"
        >
          <div className="contato__icon">◎</div>

          <div>
            <span className="contato__label">INSTAGRAM</span>
            <strong>@lucas</strong>
          </div>

          <span className="contato__arrow">↗</span>
        </a>
      </div>
    </div>

    <div className="contato__decoration">
      <span>*</span>
    </div>
  </section>
</main>

);
}
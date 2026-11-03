import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  calcularResultado,
  calcularTotalVotos,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());
  const total = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Tem certeza de que deseja zerar todos os votos?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina">
      <section className="pagina-cabecalho">
        <p className="etiqueta">A parcial da roça</p>
        <h1>Resultado da votação</h1>
        <p>
          Total de votos computados: <strong>{total}</strong>
        </p>
      </section>

      {total === 0 ? (
        <div className="resultado-vazio">
          <h2>A votação ainda não recebeu votos.</h2>
          <p>Seja o primeiro a participar e ajude a decidir quem deixa o programa.</p>
          <Link className="botao botao-principal" to="/votacao">
            Ir para votação
          </Link>
        </div>
      ) : (
        <>
          <section className="placar">
            {resultado.map((participante, indice) => (
              <article
                className={`item-resultado ${indice === 0 ? 'placar-lider' : ''}`}
                key={participante.id}
              >
                <div className="item-resultado-topo">
                  <div className="participante-foto-resultado">
                    <img src={participante.foto} alt={participante.nome} />
                  </div>
                  <div className="item-resultado-nome">
                    <h2>{participante.nome}</h2>
                    {indice === 0 && <span className="selo-lider">Sairia hoje</span>}
                  </div>
                  <p>
                    <strong>{participante.votos}</strong> votos &middot;{' '}
                    {participante.percentual.toLocaleString('pt-BR', {
                      maximumFractionDigits: 1,
                    })}
                    %
                  </p>
                </div>
                <div className="barra">
                  <div
                    className="barra-preenchida"
                    style={{ width: `${participante.percentual}%` }}
                  />
                </div>
              </article>
            ))}
          </section>
          <button type="button" className="botao botao-zerar" onClick={handleZerar}>
            Zerar votação
          </button>
        </>
      )}
    </main>
  );
}

export default Resultado;

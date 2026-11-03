import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard.jsx';
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService';

function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [quantidadeVotos, setQuantidadeVotos] = useState(0);
  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setQuantidadeVotos((quantidade) => quantidade + 1);
  }

  return (
    <main className="pagina">
      <section className="pagina-cabecalho">
        <p className="etiqueta">A decisão é sua</p>
        <h1>Quem deve sair da Fazenda?</h1>
        <p>Escolha um dos três participantes da roça para registrar seu voto.</p>
      </section>

      {ultimoVoto && (
        <div className="mensagem-voto" role="status">
          Você votou em <strong>{ultimoVoto.nome}</strong>. Você já votou{' '}
          {quantidadeVotos} {quantidadeVotos === 1 ? 'vez' : 'vezes'} nesta visita.
          <br />
          <Link to="/resultado">Confira a parcial da votação &rarr;</Link>
        </div>
      )}

      <section className="secao-participantes">
        <h2>Na roça desta semana</h2>
        <div className="grade-roca">
          {naRoca.map((participante) => (
            <ParticipanteCard
              key={participante.id}
              participante={participante}
              onVotar={handleVotar}
            />
          ))}
        </div>
      </section>

      <section className="secao-participantes">
        <h2>Demais peões</h2>
        <div className="grade-peoes">
          {foraDaRoca.map((participante) => (
            <ParticipanteCard key={participante.id} participante={participante} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;

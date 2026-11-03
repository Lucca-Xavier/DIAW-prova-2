function ParticipanteCard({ participante, onVotar }) {
  return (
    <article className={`participante-card ${participante.naRoca ? 'card-roca' : ''}`}>
      <div className="participante-foto">
        <img src={participante.foto} alt={participante.nome} />
        {participante.naRoca && <span className="selo-roca">Na roça</span>}
      </div>
      <div className="participante-info">
        <h3>{participante.nome}</h3>
        {onVotar && (
          <button
            type="button"
            className="botao botao-principal"
            onClick={() => onVotar(participante)}
          >
            Votar para eliminar
          </button>
        )}
      </div>
    </article>
  );
}

export default ParticipanteCard;

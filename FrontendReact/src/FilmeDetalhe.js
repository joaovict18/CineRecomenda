import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './FilmeDetalhe.css';

function FilmeDetalhe() {
  const [filme, setFilme] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const { id } = useParams();

  const [nota, setNota] = useState('');
  const [comentario, setComentario] = useState('');

  const buscarAvaliacoes = useCallback(() => {
    fetch(`http://localhost:8080/avaliacoes/filme/${id}`)
      .then(response => response.json())
      .then(data => setAvaliacoes(data))
      .catch(error => console.error("Erro ao buscar avaliações:", error));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:8080/filmes/${id}`)
      .then(response => response.json())
      .then(data => setFilme(data))
      .catch(error => console.error("Erro ao buscar detalhes do filme:", error));

    buscarAvaliacoes();
  }, [id, buscarAvaliacoes]);

  const handleAvaliacaoSubmit = async (event) => {
    event.preventDefault();
    const idUsuario = 1; 
    const novaAvaliacao = { nota: parseInt(nota), comentario: comentario };

    try {
      const response = await fetch(`http://localhost:8080/avaliacoes?idUsuario=${idUsuario}&idFilme=${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaAvaliacao)
      });
      if (response.ok) {
        alert('Avaliação enviada com sucesso!');
        setNota('');
        setComentario('');
        buscarAvaliacoes();
      } else {
        alert('Falha ao enviar avaliação.');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
    }
  };

  if (!filme) {
    return <div>Carregando...</div>;
  }

  // O return completo, com todas as seções:
  return (
    <div className="detalhe-container">
      <h1>{filme.nome}</h1>

      {/* SEÇÃO DE DETALHES QUE SUMIU */}
      <div className="detalhe-content">
        <p><strong>Ano de Lançamento:</strong> {new Date(filme.anoLanc).getFullYear()}</p>
        <p><strong>Duração:</strong> {filme.duracao}</p>
        <p><strong>Sinopse:</strong> {filme.sinopse}</p>
      </div>

      {/* SEÇÃO DE GÊNEROS QUE SUMIU */}
      <div className="generos-container">
        <strong>Gêneros:</strong>
        {filme.generos && filme.generos.length > 0 ? (
          filme.generos.map(genero => (
            <span key={genero.idGenero} className="genero-tag">
              {genero.nome}
            </span>
          ))
        ) : (
          <span> Gênero não informado</span>
        )}
      </div>

      {/* SEÇÃO DE AVALIAÇÕES (QUE ESTÁ FUNCIONANDO) */}
      <div className="avaliacoes-section">
        <h2>Avaliações</h2>
        
        <form onSubmit={handleAvaliacaoSubmit} className="avaliacao-form">
          <h3>Deixe sua avaliação</h3>
          <div className="form-group">
            <label htmlFor="nota">Nota (0 a 10):</label>
            <input type="number" id="nota" min="0" max="10" value={nota} onChange={(e) => setNota(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="comentario">Comentário:</label>
            <textarea id="comentario" value={comentario} onChange={(e) => setComentario(e.target.value)} required></textarea>
          </div>
          <button type="submit">Enviar Avaliação</button>
        </form>

        <div className="lista-avaliacoes">
          {avaliacoes.length > 0 ? (
            avaliacoes.map(avaliacao => (
              <div key={avaliacao.id} className="avaliacao-card">
                <p><strong>Nota: {avaliacao.nota}/10</strong></p>
                <p>"{avaliacao.comentario}"</p>
              </div>
            ))
          ) : (
            <p>Este filme ainda não tem avaliações.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilmeDetalhe;
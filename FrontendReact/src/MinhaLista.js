import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MinhaLista.css';

function MinhaLista() {
    const [lista, setLista] = useState([]);
    const idUsuario = 1; // Usando o ID 1 como exemplo

    useEffect(() => {
        fetch(`http://localhost:8080/listas/usuario/${idUsuario}`)
            .then(response => response.json())
            .then(data => setLista(data))
            .catch(error => console.error("Erro ao buscar a lista do usuário:", error));
    }, [idUsuario]);

    return (
    <div className="minha-lista-container">
        <div className="minha-lista-header">
            <h1>Minha Lista de Filmes</h1>

            {/* NOVO BOTÃO DE DOWNLOAD */}
            <a 
                href={`http://localhost:8080/pdf/lista/usuario/${idUsuario}`} 
                className="pdf-download-button"
                target="_blank" // Abre em uma nova aba, o que é bom para downloads
                rel="noopener noreferrer"
            >
                Baixar Lista em PDF
            </a>
        </div>

        {/* O resto do seu código que exibe a lista continua o mesmo... */}
        {lista.length > 0 ? (
            <div className="lista-grid">
                {lista.map(item => (
                    <div key={item.id} className="item-card">
                        <h2>{item.filme.nome}</h2>
                        <p><strong>Estado:</strong> <span className="estado-tag">{item.estado}</span></p>
                        <Link to={`/filmes/${item.filme.idFilme}`}>Ver Detalhes</Link>
                    </div>
                ))}
            </div>
        ) : (
            <p>Sua lista está vazia. Adicione filmes na página inicial!</p>
        )}
    </div>
);
}

export default MinhaLista;
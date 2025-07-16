import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Importa nosso hook de autenticação

// Importação das suas páginas/componentes
import Navbar from './Navbar';
import HomePage from './HomePage';
import LoginPage from './Login'; // Renomeei para LoginPage para clareza
import RegistroPage from './RegistroPage';
import FilmeDetalhe from './FilmeDetalhe';
import MinhaLista from './MinhaLista';
import RelatorioPage from './RelatorioPage';
import './App.css';

function App() {
  // Pega o usuário logado diretamente do nosso contexto global.
  const { currentUser } = useAuth();

  return (
    <Router>
      {/* A Navbar só aparece se houver um usuário logado */}
      {currentUser && <Navbar />}
      
      <div className="App">
        <Routes>
          {/* Rotas públicas que não exigem login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />

          {/* Rotas protegidas: só renderizam o componente se currentUser existir,
              senão, redirecionam para /login */}
          <Route path="/" element={currentUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/filmes/:id" element={currentUser ? <FilmeDetalhe /> : <Navigate to="/login" />} />
          <Route path="/minha-lista" element={currentUser ? <MinhaLista /> : <Navigate to="/login" />} />
          <Route path="/relatorio" element={currentUser ? <RelatorioPage /> : <Navigate to="/login" />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Importa nosso hook
import './Login.css';

// A função não precisa mais receber props
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { login } = useAuth(); // Pega a função 'login' do contexto
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Chama a função de login do nosso AuthContext
            const success = await login(email, password);
            
            if (success) {
                navigate('/'); // Se o login der certo, navega para a página inicial
            } else {
                alert('Email ou senha inválidos.');
            }
        } catch (error) {
            alert('Falha na comunicação com o servidor.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="login-button">Entrar</button>
                <div className="register-link">
                    <p>Não tem uma conta? <Link to="/registro">Registre-se</Link></p>
                </div>
            </form>
        </div>
    );
}

// Renomeei para LoginPage para evitar conflito com a variável 'login', mas 'Login' também funciona
export default Login;
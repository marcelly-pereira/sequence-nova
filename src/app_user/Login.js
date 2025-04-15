import React, { useState } from 'react';
import { TemplateStatic } from '../app/components/Carrossel';
import { Button } from '../app/components/Button';
import { Input } from '../app/components/Input';
import { FiChevronRight, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [debugInfo, setDebugInfo] = useState('');

    // URL do backend (ajuste conforme necessário)
    const API_URL = 'http://localhost:8000/api/token/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setDebugInfo('');

        try {
            // Usando fetch em vez de axios para simplificar o troubleshooting
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            // Mostrar informações de depuração
            setDebugInfo(`Status: ${response.status} ${response.statusText}`);
            
            // Se não for bem-sucedido, mostrar erro
            if (!response.ok) {
                const errorData = await response.text();
                setDebugInfo(prev => prev + `\nResposta: ${errorData}`);
                throw new Error(`Erro ${response.status}: ${errorData}`);
            }

            // Processar resposta bem-sucedida
            const data = await response.json();
            setDebugInfo(prev => prev + `\nLogin bem-sucedido. Token obtido.`);

            // Armazenar tokens
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            // Redirecionar (você pode substituir por window.location.href se não usar React Router)
            // navigate('/dashboard');
            window.location.href = '/dashboard';
            
        } catch (err) {
            console.error('Erro durante o login:', err);
            setError(`Falha na autenticação: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center py-8 authentication-bg">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row rounded-lg shadow-lg shadow-gray-300 overflow-hidden">
                {/* Coluna da esquerda */}
                <div className="flex-1 p-5 bg-white">
                    <h1 className="text-4xl font-bold text-black mb-2 mt-6">Bem-vindo(a)</h1>
                    <h4 className="text-md font-medium text-black mb-1">Crie sequências para:</h4>
                    <hr className="h-px border-none w-full bg-gradient-to-r from-blue-600 to-purple-700 rounded mb-3" />

                    <ul className="list-none p-0 mb-4 text-sm text-gray-700 space-y-2">
                        {['Aumentar produtividade', 'Integrar setores', 'Gerenciar informações de maneira fácil'].map((item, index) => (
                            <li key={index} className="flex items-center">
                                <FiCheckCircle className="text-blue-600 mr-2" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mb-2 mt-12">
                        <span className="px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-xs rounded-full">Novidade</span>
                        <p className="text-sm mt-3 text-gray-700">Templates prontos para você começar a usar.</p>
                    </div>

                    <div className="mt-3">
                        <TemplateStatic />
                    </div>
                </div>

                {/* Coluna da direita */}
                <div className="flex-1 p-5 bg-white flex flex-col justify-center">
                    <div className="text-center mb-4">
                        <a href="#" className="block mb-2">
                            <img src="/static/assets/images/logo.png" alt="logo" className="h-10 mx-auto" />
                        </a>
                    </div>

                    <form id="loginForm" onSubmit={handleSubmit}>
                        {error && (
                            <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
                                {error}
                            </div>
                        )}
                        
                        {debugInfo && (
                            <div className="mb-4 p-2 bg-gray-100 border border-gray-200 text-gray-800 text-xs rounded font-mono whitespace-pre-wrap">
                                <div className="font-semibold mb-1">Informações de depuração:</div>
                                {debugInfo}
                            </div>
                        )}
                        
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                        <Input
                            id="email"
                            type="email"
                            required
                            placeholder="Entre com seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className="mb-3">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha:</label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="Entre com sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pr-10"
                                />
                                <button
                                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 hover:text-gray-800"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex="-1"
                                >
                                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-3 w-3 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                                    id="checkbox-signin"
                                    name="remember"
                                />
                                <label className="ml-2 block text-xs text-gray-700" htmlFor="checkbox-signin">
                                    Continuar conectado
                                </label>
                            </div>
                        </div>

                        <div className="text-center mt-3">
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full text-md py-[0.45rem] px-2 shadow-sm"
                                icon={<FiChevronRight size={16} color="white" />}
                                disabled={loading}
                            >
                                {loading ? 'Autenticando...' : 'Acessar'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
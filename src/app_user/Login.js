import React, { useState } from 'react';
import { TemplateStatic } from '../app/components/Carrossel';
import { Button } from '../app/components/Button';
import { Input } from '../app/components/Input';
import { FiChevronRight, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="authentication-bg min-h-screen w-full">
            <div className="auth-fluid d-flex align-items-center justify-content-center min-h-screen w-full py-4">
                <div className="auth-container max-w-6xl mx-auto flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden h-auto">
                    <div className="auth-left flex-1 p-6 md:p-8 bg-white">
                        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'black' }}>Bem-vindo (a)<br /></h1>
                        <h4 style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'black' }}>Crie sequências para:</h4>
                        <hr style={{ height: '1px', border: 'none', width: '100%', margin: 'auto', background: 'linear-gradient(to right, #1526ff, #9c00bc)', borderRadius: '5px' }} />
                        <ul style={{ listStyle: 'none', padding: '0', marginTop: '20px', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', color: '#333', lineHeight: '1.8' }}>
                            <li className="d-flex align-items-center mb-2">
                                <FiCheckCircle className="text-primary me-2" style={{ fontSize: '1.1rem', marginRight: '8px', color: '#1526ff' }} />
                                <span>Aumentar produtividade</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <FiCheckCircle className="text-primary me-2" style={{ fontSize: '1.1rem', marginRight: '8px', color: '#1526ff' }} />
                                <span>Integrar setores</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <FiCheckCircle className="text-primary me-2" style={{ fontSize: '1.1rem', marginRight: '8px', color: '#1526ff' }} />
                                <span>Gerenciar informações de maneira fácil</span>
                            </li>
                        </ul>
                        <h4 className="mt-4 tag-azul" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', color: '#fff' }}>Novidade:</h4>
                        <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', color: 'black' }}>Templates prontos para você começar a usar.</p>
                        
                        <div className="mt-4">
                            <TemplateStatic />
                        </div>
                    </div>
                    <div className="auth-right flex-1 p-6 md:p-8 bg-white">
                        <div className="auth-brand text-center mb-4">
                            <a href="#" className="logo-dark d-block mb-3">
                                <img src="/static/assets/images/logo.png" alt="dark logo" style={{ height: '40px' }} />
                            </a>
                            <a href="#" className="logo-light">
                                <img src="/static/assets/images/logo-dark.png" alt="light logo" style={{ height: '40px' }} />
                            </a>
                        </div>
                        <form id="loginForm" onSubmit={handleSubmit} style={{ margin: '10px' }}>
                            <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', color: 'black' }}>Informe seu login e senha</p>
                            
                            <Input
                                id="email"
                                type="text"
                                label="Login"
                                required
                                placeholder="Entre com seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            
                            <div className="mb-3">
                                <label htmlFor="password" className="block font-medium text-gray-700 mb-1">Senha:</label>
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
                                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded" 
                                        id="checkbox-signin" 
                                        name="remember" 
                                    />
                                    <label className="ml-2 block text-sm text-gray-700" htmlFor="checkbox-signin">
                                        Continuar conectado
                                    </label>
                                </div>
                            </div>
                            
                            <div className="text-center mt-4">
                                <Button 
                                    type="submit" 
                                    variant="primary" 
                                    className="w-full py-2 px-4"
                                    icon={<FiChevronRight size={18} color="white" />}
                                >
                                    Acessar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
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
        <div className="min-h-screen w-full flex items-center justify-center py-8 authentication-bg">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row rounded-lg shadow-lg shadow-gray-300 overflow-hidden">
                {/* Coluna da esquerda para ficar mais organizado pra mim */}
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

                {/* Coluna da esquerda para ficar mais organizado pra mim */}
                <div className="flex-1 p-5 bg-white flex flex-col justify-center">
                    <div className="text-center mb-4">
                        <a href="#" className="block mb-2">
                            <img src="/static/assets/images/logo.png" alt="logo" className="h-10 mx-auto" />
                        </a>
                    </div>

                    <form id="loginForm" onSubmit={handleSubmit}>
                        {/* <p className="text-sm mb-3 text-gray-700 font-semibold">Informe seu E-mail e senha</p>*/}
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                        <Input
                            id="email"
                            type="text"
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
                            >
                                Acessar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
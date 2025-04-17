import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TemplateStatic } from '../app/components/Carrossel';
import { Button } from '../app/components/Button';
import { Input } from '../app/components/Input';
import { FiChevronRight, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';
import Toast from '../app/components/Toast';
import authService from '../services/authService';

const BENEFITS = [
  'Aumentar produtividade',
  'Integrar setores',
  'Gerenciar informações de maneira fácil'
];

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ visible: false, type: '', message: '' });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const showToast = (type, message) => {
        setToast({ visible: true, type, message });
        
        if (type === 'success') {
            setTimeout(() => {
                setToast(prev => ({ ...prev, visible: false }));
            }, 2000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authService.login(formData.email, formData.password);
            
            showToast('success', 'Login realizado com sucesso! Redirecionando...');
            
            setTimeout(() => {
                navigate('/home');
            }, 1500);
            
        } catch (error) {
            let errorMessage = 'Ocorreu um erro durante o login.';
            
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Email ou senha incorretos. Por favor, tente novamente.';
                } else {
                    errorMessage = `Erro ${error.response.status}: ${error.response.data?.detail || 'Falha na autenticação'}`;
                }
            } else if (error.request) {
                errorMessage = 'Sem resposta do servidor. Verifique sua conexão.';
            }
            
            showToast('error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center py-8 authentication-bg">
            {toast.visible && (
                <div className="fixed top-4 right-4 z-50">
                    <Toast 
                        type={toast.type} 
                        message={toast.message} 
                        onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
                    />
                </div>
            )}
            
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row rounded-lg shadow-lg shadow-gray-300 overflow-hidden">
                <div className="flex-1 p-5 bg-white">
                    <h1 className="text-4xl font-bold text-black mb-2 mt-6">Bem-vindo(a)</h1>
                    <h4 className="text-md font-medium text-black mb-1">Crie sequências para:</h4>
                    <hr className="h-px border-none w-full bg-gradient-to-r from-blue-600 to-purple-700 rounded mb-3" />

                    <ul className="list-none p-0 mb-4 text-sm text-gray-700 space-y-2">
                        {BENEFITS.map((item, index) => (
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

                <div className="flex-1 p-5 bg-white flex flex-col justify-center">
                    <div className="text-center mb-4">
                        <button
                            type="button"
                            className="block mb-2 bg-transparent border-none p-0 cursor-pointer"
                            onClick={() => console.log('Logo clicked')}
                        >
                            <img src="/static/assets/images/logo.png" alt="logo" className="h-10 mx-auto" />
                        </button>
                    </div>

                    <form id="loginForm" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Entre com seu e-mail"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <div className="mb-3">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha:</label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="Entre com sua senha"
                                    value={formData.password}
                                    onChange={handleChange}
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
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                />
                                <label className="ml-2 block text-xs text-gray-700" htmlFor="rememberMe">
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
                                {loading ? 'Entrando...' : 'Acessar'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
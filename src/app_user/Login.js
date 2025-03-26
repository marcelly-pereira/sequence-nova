import React, { useState } from 'react';
import '../App.css'; // Crie um arquivo CSS separado para os estilos

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Adicione a lógica de autenticação aqui
    };

    return (
        <div className="authentication-bg">
            <div className="auth-fluid d-flex align-items-center justify-content-center">
                <div className="auth-container">
                    <div className="auth-left">
                        <h1 style={{ fontSize: '2.5rem', color: 'black' }}>Bem-vindo (a)<br /></h1>
                        <h4 style={{ fontSize: '1.2rem', color: 'black' }}>Crie sequências para:</h4>
                        <hr style={{ height: '1px', border: 'none', width: '100%', margin: 'auto', background: 'linear-gradient(to right, #1526ff, #9c00bc)', borderRadius: '5px' }} />
                        <ul style={{ listStyle: 'none', padding: '0', marginTop: '20px', fontSize: '1rem', color: '#333', lineHeight: '1.8' }}>
                            <li className="d-flex align-items-center mb-2">
                                <i className="mdi mdi-check-circle-outline text-primary me-2" style={{ fontSize: '1.1rem' }}></i>
                                <span>Aumentar produtividade</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <i className="mdi mdi-check-circle-outline text-primary me-2" style={{ fontSize: '1.1rem' }}></i>
                                <span>Integrar setores</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <i className="mdi mdi-check-circle-outline text-primary me-2" style={{ fontSize: '1.1rem' }}></i>
                                <span>Gerenciar informações de maneira fácil</span>
                            </li>
                        </ul>
                        <h4 className="mt-4 tag-azul" style={{ fontSize: '1.0rem', color: '#fff' }}>Novidade:</h4>
                        <p style={{ fontSize: '1rem', color: 'black' }}>Templates prontos para você começar a usar.</p>
                        <div id="carouselExampleCaption" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner" role="listbox">
                                <div className="carousel-item active position-relative">
                                    <img src="/static/assets/images/templates/vendasenegociacoes.png" alt="Template de Vendas e Negociações" className="d-block img-fluid" />
                                </div>
                                <div className="carousel-item position-relative">
                                    <img src="/static/assets/images/templates/ordemdeservicos.png" alt="Template de Ordem de Serviços" className="d-block img-fluid" />
                                </div>
                                <div className="carousel-item position-relative">
                                    <img src="/static/assets/images/templates/legalizacao.png" alt="Template de Legalização" className="d-block img-fluid" />
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleCaption" role="button">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Anterior</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleCaption" role="button">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Próximo</span>
                            </a>
                        </div>
                    </div>
                    <div className="auth-right">
                        <div className="auth-brand text-center mb-4">
                            <a href="#" className="logo-dark d-block mb-3">
                                <img src="/static/assets/images/logo.png" alt="dark logo" style={{ height: '40px' }} />
                            </a>
                            <a href="#" className="logo-light">
                                <img src="/static/assets/images/logo-dark.png" alt="light logo" style={{ height: '40px' }} />
                            </a>
                        </div>
                        <form id="loginForm" onSubmit={handleSubmit} style={{ margin: '10px' }}>
                            <p style={{ fontSize: '1rem', color: 'black' }}>Informe seu login e senha</p>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">*&nbsp;Login:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="email"
                                    required
                                    id="email"
                                    placeholder="Entre com seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">*&nbsp;Senha:</label>
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        required
                                        id="password"
                                        placeholder="Entre com sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        className="btn search-button"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} id="icon"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="checkbox-signin" name="remember" />
                                    <label className="form-check-label" htmlFor="checkbox-signin">Continuar conectado</label>
                                </div>
                            </div>
                            <div className="d-grid text-center mt-4">
                                <button className="btn-sequence-enter" type="submit">Acessar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
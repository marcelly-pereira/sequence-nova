import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from './app/BaseLayout'; // Verifique se o caminho está correto
import Home from './app_user/Home';
import Login from './app_user/Login';
import Teste from './app_user/Teste';
import './App.css'; // Verifique se o caminho está correto

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path='teste' element={<Teste />} />
                <Route path="*" element={<BaseLayout />}>
                    <Route index element={<Home />} /> {/* Use "index" para a rota padrão */}
                    {/* Adicione outras rotas aqui */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
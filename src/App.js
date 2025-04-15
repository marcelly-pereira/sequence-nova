import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BaseLayout from './app/BaseLayout';
import Login from './app_user/Login';
import './App.css';
import Home from './app_user/Home';
import MySequences from './app_user/pages/sequences/MySequences';
import TemplatesSequencia from './app_user/pages/sequences/TemplatesSequence';
import Lists from './app_user/pages/tasks/Lists';
import Recurrent from './app_user/pages/tasks/Recurrent/Recurrent';
import Companies from './app_user/pages/companies/ActiveClients';
import Automations from './app_user/pages/personalization/Automations/Automations';
import Registrations from './app_user/pages/personalization/Registrations';
import User from './app_user/User';
import Notification from './app_user/Notification';
import Record from './app_user/pages/companies/Record/Record';
import DeploymentCard from './app_user/pages/personalization/Automations/DeploymentCard';

function App() {
        return (
                <Router>
                        <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/login" element={<Login />} />

                                <Route path="/home" element={
                                        <Home />
                                } />

                                <Route path="/baseLayout" element={
                                        <BaseLayout />
                                }>
                                </Route>

                                <Route path="/sequencia" element={
                                        <MySequences />
                                } />

                                <Route path="/templates" element={
                                        <TemplatesSequencia />
                                } />

                                <Route path="/tarefas" element={
                                        <Lists />
                                } />

                                <Route path="/detalhes_tarefas" element={
                                        <Recurrent />
                                } />

                                <Route path="/empresas" element={
                                        <Companies />
                                } />

                                <Route path="/configurações" element={
                                        <Registrations />
                                } />

                                <Route path="/lista-automacoes" element={
                                        <Automations />
                                } />

                                <Route path="/user" element={
                                        <User />
                                } />

                                <Route path="/notification" element={
                                        <Notification />
                                } />

                                <Route path="/record" element={
                                        <Record />
                                } />

                                <Route path="/deploymentcard" element={
                                        <DeploymentCard />
                                } />

                                <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                </Router>
        );
}

export default App;
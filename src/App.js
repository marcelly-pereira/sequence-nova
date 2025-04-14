import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from './app/BaseLayout';
import Login from './app_user/Login';
import './App.css';
import Home from '../src/app_user/Home'
import MySequences from './app_user/pages/sequences/MySequences';
import TemplatesSequencia from './app_user/pages/sequences/TemplatesSequence';
import Lists from '../src/app_user/pages/tasks/Lists';
import Recurrent from '../src/app_user/pages/tasks/Recurrent/Recurrent';
import Companies from '../src/app_user/pages/companies/ActiveClients';
import Automations from '../src/app_user/pages/personalization/Automations';
import Registrations from '../src/app_user/pages/personalization/Registrations';
import User from '../src/app_user/User';
import Notification from '../src/app_user/Notification';
import Record from '../src/app_user/Record';
import DeploymentCard from '../src/app_user/DeploymentCard'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/baseLayout" element={<BaseLayout />}>
                    <Route index element={<Login />} />
                </Route>
                <Route
                    path="/sequencia"
                    element={
                        <MySequences />
                    }
                />
                <Route
                    path="/templates"
                    element={
                        <TemplatesSequencia />
                    }
                />
                <Route
                    path="/tarefas"
                    element={
                        <Lists />
                    }
                />
                <Route
                    path="/detalhes_tarefas"
                    element={
                        <Recurrent />
                    }
                />
                <Route
                    path="/empresas"
                    element={
                        <Companies />
                    }
                />
                <Route
                    path="/configurações"
                    element={
                        <Registrations />
                    }
                />
                <Route
                    path="/lista-automacoes"
                    element={
                        <Automations />
                    }
                />
                <Route path="/user" element={<User />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/record" element={<Record />} />
                <Route path="/deploymentcard" element={<DeploymentCard />} />
            </Routes>
        </Router>
    );
}

export default App;
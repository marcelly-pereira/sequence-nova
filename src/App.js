import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from './app/BaseLayout';
import Login from './app_user/Login';
import './App.css';
import MySequences from './app_user/pages/sequences/MySequences';
import TemplatesSequencia from './app_user/pages/sequences/TemplatesSequence';
import Lists from '../src/app_user/pages/tasks/Lists';
import Recurrent from '../src/app_user/pages/tasks/Recurrent';
import Companies from '../src/app_user/pages/companies/ActiveClients';
import Automations from '../src/app_user/pages/personalization/Automations';
import Registrations from '../src/app_user/pages/personalization/Registrations';
import User from '../src/app_user/User';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Login />} />
                <Route path="/baseLayout" element={<BaseLayout />}>
                    <Route index element={<Login />} />
                </Route>
                <Route
                    path="/sequences/my-sequences"
                    element={
                        <MySequences />
                    }
                />
                <Route
                    path="/sequences/templates"
                    element={
                        <TemplatesSequencia />
                    }
                />
                <Route
                    path="/tasks-lists"
                    element={
                        <Lists />
                    }
                />
                <Route
                    path="/tasks-recurrent"
                    element={
                        <Recurrent />
                    }
                />
                <Route
                    path="/actives-clients"
                    element={
                        <Companies />
                    }
                />
                <Route
                    path="/personalization-automations"
                    element={
                        <Automations />
                    }
                />
                <Route
                    path="/personalization-registrations"
                    element={
                        <Registrations />
                    }
                />
                <Route path="/user" element={<User />} />
            </Routes>
        </Router>
    );
}

export default App;
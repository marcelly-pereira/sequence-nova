import React from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../app/components/Sidebar';
import Header from '../app/components/Header';

const BaseLayout = ({ children, title = 'Sequence', username = 'Marcelly Pereira' }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} | Sequence</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Conteúdo principal */}
      <div className="flex flex-col flex-grow ml-16">
        {/* Header */}
        <Header username={username} />
        
        {/* Conteúdo da página */}
        <main className="flex-grow p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
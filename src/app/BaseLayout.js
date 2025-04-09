import React from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../app/components/Sidebar';
import Header from '../app/components/Header';

const BaseLayout = ({ 
  children, 
  title 
}) => {
  return (
    <div className="flex min-h-screen bg-[#eceef1]">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <Sidebar />
      
      <div className="flex flex-col flex-grow ml-16">
        <Header 
          title={title}
        />
        
        <main className="flex-grow p-4 bg-[#eceef1]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
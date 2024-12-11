import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="content">
        {children} {/* Render children passed to the Layout component */}
      </div>
    </div>
  );
};

export default Layout;

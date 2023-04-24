import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <main className='relative min-h-screen h-[2000px] bg-white'>
      <Header />
      <main className='container m-auto mt-20 px-4'>{children}</main>
    </main>
  );
};

export default Layout;

import App from 'next/app';
import { createContext } from 'react';
import '../styles/globals.css';

function MyApp(props) {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
}

export default MyApp;

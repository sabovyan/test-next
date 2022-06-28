import App from 'next/app';
import '../styles/globals.css';

function MyApp(props) {
  const { Component, pageProps, countries, country } = props;

  const componentProps = {
    ...pageProps,
    countries,
    country,
  };

  return <Component {...componentProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  let countries, country;

  try {
    if (appContext.ctx.query.id) {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${appContext.ctx.query.id}`
      );
      country = await response.json();
    }

    const response = await fetch('https://restcountries.com/v3.1/all');
    countries = await response.json();
  } catch (err) {
    console.error(err);
  }

  const appProps = await App.getInitialProps(appContext);
  return {
    ...appProps,
    countries,
    country,
  };
};

export default MyApp;

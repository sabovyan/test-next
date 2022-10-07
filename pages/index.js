import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import camelCase from 'lodash/camelCase';

import '@adyen/adyen-web/dist/adyen.css';

// export const getStaticProps = async (context) => {
export const getServerSideProps = async (context) => {
  let countries, countries1, countries2, countries3;

  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    countries = await response.json();

    const response2 = await fetch('https://restcountries.com/v3.1/all');
    countries1 = await response2.json();

    const response3 = await fetch('https://restcountries.com/v3.1/all');
    countries2 = await response3.json();

    const response4 = await fetch('https://restcountries.com/v3.1/all');
    countries3 = await response4.json();

    return {
      props: {
        countries,
        countries1,
        countries2,
        countries3,
      },
    };
  } catch (err) {
    console.error(err);

    return {
      props: {},
      err,
    };
  }
};

export default function Home(props) {
  const { countries } = props;

  const addAdyen = async () => {
    const adyen = await import(
      /* webpackChunkName: "ADYENCHUNK" */
      '@adyen/adyen-web'
    );

    console.log('addAdyen :>> ', adyen);

    const AdyenCheckout = adyen.default;

    const configuration = {
      environment: 'test',
      clientKey: 'test_870be2854add4f56b86778353010f36c', // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
      analytics: {
        enabled: true, // Set to false to not send analytics data to Adyen.
      },
      session: {
        id: 'CSD9CAC3...', // Unique identifier for the payment session.
        sessionData: 'Ab02b4c...', // The payment session data.
      },
      onPaymentCompleted: (result, component) => {
        console.info(result, component);
      },
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
      },
      // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
      // For example, this is 3D Secure configuration for cards:
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          billingAddressRequired: true,
        },
      },
    };
    const checkout = await AdyenCheckout(configuration);
    const dropinComponent = checkout
      .create('dropin')
      .mount('#dropin-container');
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {countries.map((country) => (
        <div key={country.cca3}>
          <p>
            <Link prefetch={false} href={`/country/${country.name.common}`}>
              <button
                onClick={() => {
                  console.log('hello');
                }}
              >
                {camelCase(country.name.common)}
              </button>
            </Link>
          </p>
        </div>
      ))}
      <button onClick={addAdyen}>add adyen</button>

      <div id="dropin-container"></div>
    </div>
  );
}

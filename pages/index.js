import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

import styles from '../styles/Home.module.css';

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
                {country.name.common}
              </button>
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
}

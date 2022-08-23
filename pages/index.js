import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

import styles from '../styles/Home.module.css';

export const getServerSideProps = async (context) => {
  let countries;

  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    countries = await response.json();

    return {
      props: {
        countries,
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
            <Link href={`/country/${country.name.common}`}>
              {country.name.common}
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
}

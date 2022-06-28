import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home(props) {
  const { countries } = props;

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {countries.map((country) => (
        <div key={country.cca3}>
          <p>
            <a href={`countries/${country.name.common}`}>
              {country.name.common}
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}

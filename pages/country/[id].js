import Link from 'next/link';

export const getServerSideProps = async (context) => {
  const { query } = context;

  let country = null;

  try {
    if (query.id) {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${query.id}`
      );

      country = await response.json();
    }
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      country,
    },
  };
};

export default function Country(props) {
  const { country } = props;
  console.log(`🐞 / Country / country`, country);

  return (
    <div>
      <h1>{country[0].name?.common}</h1>
      <Link href={'/'}>home</Link>
    </div>
  );
}

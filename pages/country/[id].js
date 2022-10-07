import Link from 'next/link';

// export const getStaticProps = async (context) => {
  export const getServerSideProps = async (context) => {
  const start = new Date();

  const { params } = context;

  let country = null;

  try {
    if (params.id) {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${params.id}`
      );

      country = await response.json();
    }
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      country,
      startString: start.toString(),
    },
  };
};

// export async function getStaticPaths() {
//   return {
//     // paths: [{ params: { id: 'Spain' } }, { params: { id: 'Malawi' } }],
//     paths: [],
//     fallback: 'blocking', // can also be true or 'blocking'
//   };
// }

export default function Country(props) {
  const { country, startString } = props;

  const start = new Date(startString);

  const current = new Date();

  const diff = (current.getTime() - start.getTime()) / 1000;

  console.log(diff);

  return (
    <div>
      <h1>{country[0].name?.common}</h1>
      <Link href={'/'}>home</Link>
    </div>
  );
}

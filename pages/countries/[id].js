export default function Country(props) {
  const { country } = props;

  return (
    <div>
      <h1>{country[0].name?.common}</h1>
    </div>
  );
}

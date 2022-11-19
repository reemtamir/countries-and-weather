import { useEffect, useState } from 'react';
import CountryCard from './countryCard';
import LoadingButton from '@mui/lab/LoadingButton';

const CountriesList = () => {
  const [countrySelectedName, setCountrySelectedName] = useState('');
  const [countriesList, setCountriesList] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch(
        'https://restcountries.com/v2/all?fields=name'
      );

      const countriesData = await response.json();

      setCountriesList(countriesData.map((country) => country.name));
    };
    getCountries();
  }, []);
  if (!countriesList.length) {
    return (
      <>
        <div className="container m-auto ">
          <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container m-auto ">
        <select
          onChange={(e) => setCountrySelectedName(e.target.value)}
          className="form-select mx-3 my-3 text-danger"
          aria-label="Default select example"
          defaultValue={countrySelectedName}
        >
          <option value=""></option>
          {countriesList.map((name) => (
            <option className="text-info" key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <div className=" text-center m-auto mt-4">
          {countrySelectedName && <CountryCard name={countrySelectedName} />}
        </div>
      </div>
    </>
  );
};
export default CountriesList;

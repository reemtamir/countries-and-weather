import { useEffect, useState } from 'react';
import Weather from './Weather';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Trivia from './Trivia';
const CountryCard = ({ name }) => {
  const [country, setCountry] = useState(null);
  const [isWeatherClicked, setIsWeatherClicked] = useState(false);
  const [isTriviaClicked, setIsTriviaClicked] = useState(false);
  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
      );

      const countriesData = await response.json();

      const chosenCountry = countriesData[0];
      const {
        flags: { svg },
        maps: { googleMaps: map },
        name: { official: officialName },
        population,
        capital,
        languages,
        currencies,
      } = chosenCountry;

      const [first] = Object.entries(currencies);

      const { name: coinName, symbol: coinSymbol } = first[1];

      setCountry({
        svg,
        map,
        officialName,
        population,
        name,
        capital,
        languages,
        coinName,
        coinSymbol,
      });
    };

    getCountries();
  }, [name]);

  if (!country) return;
  const {
    svg,
    map,
    officialName,
    population,
    capital,
    languages,
    coinName,
    coinSymbol,
  } = country;
  const getWeather = () => {
    setIsWeatherClicked(true);
  };
  const playTrivia = () => {
    setIsTriviaClicked(true);
  };
  return (
    <>
      {!isWeatherClicked && !isTriviaClicked && (
        <div className="card m-auto" style={{ width: '22rem' }}>
          <div className="card-body">
            <h5 className="card-title">
              {officialName.charAt(0).toUpperCase() + officialName.slice(1)}
            </h5>
            <img src={svg} className="card-img-top" alt={`${name} flag`} />
          </div>
          <ul className="list-group list-group-flush text-start">
            <li className="list-group-item">
              {' '}
              <i className="bi bi-people-fill  me-2"> </i>
              {population.toLocaleString()}
            </li>
            <li className="list-group-item">
              <img
                className=" me-2"
                style={{ height: 20, marginLeft: -5 }}
                src="https://cdn-icons-png.flaticon.com/512/4327/4327367.png"
                alt={`${name}'s capital city's image`}
              />{' '}
              {capital}
            </li>
            <li className="list-group-item ">
              <i className="bi bi-translate  me-2 "></i>{' '}
              {Object.values(languages).join(', ')}
            </li>
            <li className="list-group-item  ">
              <i className="bi bi-currency-exchange me-2"></i>
              {coinName}({coinSymbol})
            </li>

            <li className="list-group-item ">
              <div className="card-body text-center">
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                  <Fab variant="extended">
                    <NavigationIcon sx={{ mr: 1 }} />
                    <a href={map} className="card-link" target={'_blank'}>
                      Navigate
                    </a>
                  </Fab>
                  <Fab variant="extended">
                    <a
                      href={`https://en.wikipedia.org/wiki/${name}`}
                      className="card-link"
                      target={'_blank'}
                    >
                      WikipediA
                    </a>
                  </Fab>
                </Box>
              </div>
            </li>
            <li className="list-group-item text-center">
              <button
                onClick={getWeather}
                className="btn btn-primary mx-2 my-2"
              >
                Weather
              </button>
              <button
                onClick={playTrivia}
                className="btn btn-primary mx-2 my-2"
              >
                Trivia
              </button>
          
            </li>
          </ul>
        </div>
      )}

      {isWeatherClicked && !isTriviaClicked && (
        <Weather name={name} setIsWeatherClicked={setIsWeatherClicked} />
      )}

      {isTriviaClicked && !isWeatherClicked && <Trivia setIsTriviaClicked={setIsTriviaClicked} />}
    </>
  );
};

export default CountryCard;

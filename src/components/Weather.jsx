import { useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

import { apiKey, getTime } from '../script';
const Weather = ({ setIsClicked, name }) => {
  const [countryWeather, setCountryWeather] = useState(null);
  useEffect(() => {
    const getWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
      );

      const weatherData = await response.json();

      setCountryWeather(weatherData);
    };
    getWeather();
  }, [name]);
  if (!countryWeather) {
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

  const {
    weather: [{ description, icon }],
    main: {
      temp,
      temp_max: max,
      temp_min: min,
      humidity,
      feels_like: feelsLike,
    },
    wind: { speed },
    sys: { sunrise, sunset },
  } = countryWeather;
  const remove = () => {
    setIsClicked(false);
  };

  let sunriseTime = new Date(sunrise * 1000);
  let sunsetTime = new Date(sunset * 1000);
  sunriseTime = getTime(sunriseTime.toString());
  sunsetTime = getTime(sunsetTime.toString());

  return (
    <>
      <section className="vh-60" style={{ backgroundColor: ' #4B515D' }}>
        <div className="container py-5 h-50">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div
                className="card"
                style={{ color: '#4B515D', borderRadius: '35px' }}
              >
                <div className="card-body p-4">
                  <div className="d-flex">
                    <h3 className="flex-grow-1 text-start">{name}</h3>
                  </div>

                  <div className="text-start">
                    <i
                      className="fas fa-sun fa-fw"
                      style={{ color: ' #868B94' }}
                    ></i>{' '}
                    Sunrise
                    <span className="ms-1"> {sunriseTime} AM </span>
                  </div>

                  <div className="text-start">
                    <i
                      className="fas fa-sun fa-fw"
                      style={{ color: ' #868B94' }}
                    ></i>{' '}
                    Sunset
                    <span className="ms-1"> {sunsetTime} PM </span>
                  </div>

                  <div className="d-flex flex-column text-center mt-5 mb-4">
                    <h6
                      className="display-4 mb-0 font-weight-bold"
                      style={{ color: ' #1C2331' }}
                    >
                      {' '}
                      {temp.toFixed()}°C{' '}
                    </h6>
                    <span className="small" style={{ color: '#868B94' }}>
                      {description}
                    </span>
                  </div>

                  <div className="d-flex align-items-center">
                    <div
                      className="flex-grow-1 text-start"
                      style={{ fontsize: '1rem' }}
                    >
                      <div>
                        <i
                          className="fas fa-sun fa-fw"
                          style={{ color: ' #868B94' }}
                        ></i>{' '}
                        Feels like:
                        <span className="ms-1"> {feelsLike}°C </span>
                      </div>
                      <div>
                        <i
                          className="fas fa-wind fa-fw"
                          style={{ color: '#868B94' }}
                        ></i>{' '}
                        Wind speed:
                        <span className="ms-1"> {speed.toFixed(1)} km/h</span>
                      </div>
                      <div>
                        <i
                          className="fas fa-tint fa-fw"
                          style={{ color: '#868B94' }}
                        ></i>{' '}
                        Humidity:
                        <span className="ms-1"> {humidity}% </span>
                      </div>

                      <div>
                        <i
                          className="fas fa-sun fa-fw"
                          style={{ color: ' #868B94' }}
                        ></i>{' '}
                        Min: {min}°C Max: {max}°C
                      </div>
                    </div>
                    <div>
                      <img
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col m-auto text-center mt-3">
                <button className="btn btn-primary " onClick={remove}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Weather;

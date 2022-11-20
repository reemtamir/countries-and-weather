import { imageListClasses } from '@mui/material';
import { useEffect, useState } from 'react';

const Holydays = ({ countryCode, setIsHolydaysClicked }) => {
  const [holydays, setHolydays] = useState([]);
  useEffect(() => {
    const getHolydays = async () => {
      try {
        const response = await fetch(
          `https://date.nager.at/api/v3/publicholidays/${new Date().getFullYear()}/${countryCode}`
        );

        const HolydaysData = await response.json();

        setHolydays(HolydaysData);
      } catch (error) {
        setHolydays([]);
      }
    };
    getHolydays();
  }, [countryCode]);

  const convertDigitIn = (str) => {
    return str.split('-').reverse().join('-');
  };
  const remove = () => {
    setIsHolydaysClicked(false);
  };
  return (
    <>
      {!holydays.length && (
        <div>
          <img
            className="w-50"
            src="https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png"
            alt="no data image"
          />
        </div>
      )}

      {holydays.length > 0 && (
        <table className="table w-50 m-auto bg-warning">
          <thead>
            <tr className="text-danger">
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Holyday name</th>
            </tr>
          </thead>
          <tbody>
            {holydays.map((holyday, index) => {
              const { date, name } = holyday;

              return (
                <tr key={index} className="text-primary">
                  <th scope="row">{index + 1}</th>
                  <td>{convertDigitIn(date)}</td>
                  <td>{name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <button onClick={remove} className="btn btn-primary mt-3">
        Back
      </button>
    </>
  );
};

export default Holydays;

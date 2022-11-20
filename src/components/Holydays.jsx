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
      {!holydays.length && <p>no data</p>}

      {holydays.length > 0 && (
        <table className="table text-danger">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">name</th>
            </tr>
          </thead>
          <tbody>
            {holydays.map((holyday, index) => {
              const { date, name } = holyday;

              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{convertDigitIn(date)}</td>
                  <td>{name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <button onClick={remove} className="btn btn-primary">
        Back
      </button>
    </>
  );
};

export default Holydays;

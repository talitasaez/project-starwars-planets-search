import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import myContext from './myContext';

function MyProvider({ children }) {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setdata(results.map((a) => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
        delete a.residents;
        return a;
      }));
      setdata(results);
    };
    requestApi();
  }, []);

  const contexto = useMemo(() => ({
    data,
  }), [data]);

  return (
    <myContext.Provider value={ contexto }>
      { children }
    </myContext.Provider>
  );
}
MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MyProvider;

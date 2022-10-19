import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import myContext from './myContext';

function MyProvider({ children }) {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const { results } = await response.json();
        results.map((a) => delete a.residents);
        setdata(results);
      } catch (e) {
        throw new Error(e.message);
      }
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

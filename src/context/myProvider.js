import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import myContext from './myContext';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [nameFilterInput, setNameFilterInput] = useState('');
  const [filterSelected, setFilterSelected] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: 0,
  });

  useEffect(() => {
    const requestApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setData(results.map((a) => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
        delete a.residents;
        return a;
      }));
      setData(results);
    };
    requestApi();
  }, []);

  const contexto = useMemo(() => ({
    data,
    setData,
    nameFilterInput,
    setNameFilterInput,
    filterSelected,
    setFilterSelected,
  }), [data, nameFilterInput, filterSelected, setData]);

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

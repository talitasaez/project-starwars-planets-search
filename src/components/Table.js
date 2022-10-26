import React, { useContext } from 'react';
import MyContext from '../context/myContext';

/* feito com a ajuda da mentoria turma 23 A instrutores Artur e Henrique e mentoria Hellen turma 24 A */

function Table() {
  const {
    data,
    setData,
    nameFilterInput,
    setNameFilterInput,
    filterSelected,
    setFilterSelected,
    newFilterNumeric,
    setNewFilterNumeric,
  } = useContext(MyContext);

  const handleClickFilter = () => {
    const { columnFilter, comparisonFilter, valueFilter } = filterSelected;
    const newFilterColumn = newFilterNumeric.filter(
      (columns) => columns !== columnFilter,
    );
    console.log(columnFilter, 'aqui');
    const filterComparison = data.filter((element) => {
      switch (comparisonFilter) {
      case 'maior que':
        return element[columnFilter] > Number(valueFilter);
      case 'menor que':
        return element[columnFilter] < Number(valueFilter);
      default:
        return element[columnFilter] === valueFilter;
      }
    });
    setData(filterComparison);
    setNewFilterNumeric(newFilterColumn);
    setFilterSelected(
      { columnFilter: 'population',
        comparisonFilter: 'maior que',
        valueFilter: 0 },
    );
  };

  return (
    <div>
      <label htmlFor="name-filter">
        <input
          placeholder="Digite sua busca pelo nome do Planeta"
          name="name-filter"
          data-testid="name-filter"
          value={ nameFilterInput }
          onChange={ ({ target }) => setNameFilterInput(target.value) }
        />

      </label>
      <div>
        <select
          data-testid="column-filter"
          name="columnFilter"
          value={ filterSelected.columnFilter }
          onChange={ ({ target }) => setFilterSelected((prevSelected) => (
            { ...prevSelected, columnFilter: target.value })) }
        >
          {/* <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option> */}
          {
            newFilterNumeric.map((e) => (
              <option key={ e }>{e}</option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparisonFilter"
          value={ filterSelected.comparisonFilter }
          onChange={ ({ target }) => setFilterSelected((prevSelected) => (
            { ...prevSelected, comparisonFilter: target.value })) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          name="valueFilter"
          value={ filterSelected.valueFilter }
          type="number"
          data-testid="value-filter"
          onChange={ ({ target }) => setFilterSelected((prevSelected) => (
            { ...prevSelected, valueFilter: target.value })) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleClickFilter }
        >
          Filtrar
        </button>
        {/* <button
        type="button"
        data-testid='filter'
        // onclick={}
        >
        </button> */}
        <label htmlFor="button-remove-filters">
          <input
            id="button-remove-filters"
            type="button"
            data-testid="button-remove-filters"
          />
          Remove Filtros
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(({ name }) => name.toLowerCase()
              .includes(nameFilterInput.toLowerCase()))
            .map((datas, index) => (
              <tr key={ index }>
                <td>{datas.name}</td>
                <td>{datas.rotation_period}</td>
                <td>{datas.orbital_period}</td>
                <td>{datas.diameter}</td>
                <td>{datas.climate}</td>
                <td>{datas.gravity}</td>
                <td>{datas.terrain}</td>
                <td>{datas.surface_water}</td>
                <td>{datas.population}</td>
                <td>{datas.films}</td>
                <td>{datas.edited}</td>
                <td>{datas.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;

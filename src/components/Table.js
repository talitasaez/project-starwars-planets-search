import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function Table() {
  const {
    data,
    nameFilterInput,
    setNameFilterInput,
  } = useContext(MyContext);

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
        {/* feito com a ajuda da mentoria 23A Artur  */}
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
          ;
        </tbody>
      </table>
    </div>
  );
}
export default Table;

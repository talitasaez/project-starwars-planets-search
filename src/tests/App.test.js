import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import RenderWithContext from './RenderWithContext';
import testData from '../../cypress/mocks/testData';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';


// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Testando aplicação Star Wars', () => {
  it('Verifica se a API é chamada', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    })
    await act( async () => {
      RenderWithContext(<App />);
    })
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    userEvent.selectOptions(columnFilter,['population']);
    userEvent.selectOptions(comparisonFilter,['maior que']);
    userEvent.type(valueFilter, '3000');
    userEvent.click(btnFilter);
    waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(7));
    userEvent.clear(valueFilter)
    userEvent.selectOptions(columnFilter,['orbital_period'])
    userEvent.selectOptions(comparisonFilter,['igual a']);
    userEvent.type(valueFilter, '341');
    userEvent.click(btnFilter);

   
  });
}); 
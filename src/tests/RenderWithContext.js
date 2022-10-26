import React from 'react';
import { render } from '@testing-library/react';
import MyProvider from '../context/myProvider';

function RenderWithContext(children) {
  return (
    render(
      <MyProvider>
        { children }
      </MyProvider>
    )
  )
};

export default RenderWithContext;
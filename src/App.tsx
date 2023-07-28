import React from 'react';
import { Import } from './Import';
import styled from 'styled-components';





const Head =styled.h6`
  margin-left:40%;
  font-size:100%;

`

function App() {
  return (
    <div className="App">
      <Head>QUIZ APP WITH API Integration</Head>
      <Import/>
    </div>
  );
}

export default App;

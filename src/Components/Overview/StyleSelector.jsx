import React from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';
// import axios from 'axios';
const SelectorDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: grey;
  border: 10px;
  border-color: black;
`;

const SelectorH3 = styled.h3`
  background-color: grey;
`;

function StyleSelector() {
  return (
    <SelectorDiv>
      <SelectorH3>StyleSelector</SelectorH3>
    </SelectorDiv>
  );
}

export default hot(StyleSelector);

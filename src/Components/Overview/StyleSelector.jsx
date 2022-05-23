import React from 'react';
import { hot } from 'react-hot-loader/root';
// import styled from 'styled-components';
// import axios from 'axios';
import { SelectorWrapper, Title, StyleThumbnail, StyleSelectorContainer } from '../StyledComponents.jsx';

function StyleSelector() {
  return (
    <SelectorWrapper>
      <Title>StyleSelector</Title>
      <StyleSelectorContainer>
        <StyleThumbnail src='https://i.imgur.com/sNZ0V4q.jpeg' />
        <StyleThumbnail src='https://i.imgur.com/sNZ0V4q.jpeg' />
        <StyleThumbnail src='https://i.imgur.com/sNZ0V4q.jpeg' />
        <StyleThumbnail src='https://i.imgur.com/sNZ0V4q.jpeg' />
        <StyleThumbnail src='https://i.imgur.com/sNZ0V4q.jpeg' />
        <StyleThumbnail src='https://i.imgur.com/sNZ0V4q.jpeg' />
        <StyleThumbnail src='https://i.imgur.com/sNZ0V4q.jpeg' />
        <StyleThumbnail src='https://i.imgur.com/sNZ0V4q.jpeg' />
      </StyleSelectorContainer>
    </SelectorWrapper>
  );
}

export default hot(StyleSelector);

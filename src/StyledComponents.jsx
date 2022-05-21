import React from 'react';
import styled from 'styled-components';

const styledComponents = () => {
  const ImageWrapper = styled.section`
    position: relative;
    background: blanchedalmond;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    z-index: 2;
  `;
  const ExpandButton = styled.button`
    position: absolute;
    right: 0%;
    top: 0%;
    z-index: 2;
  `;
  const DogImage = styled.img`
    position: relative;
    height: auto;
    left: 0%;
    width: 70%;
    z-index: 1;
  `;
  const Thumbnails = styled.div`
    position: absolute;
    width: 10%;
    left: 0%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: white;
    z-index: 2;
  `;
  const ThumbnailImage = styled.img`
    height: auto;
  `;

  const Flexbox = styled.div`
    display: flex;
    justify-content: center;
    max-width: 90%;
    margin: auto;
  `;
  const StyledPageTitle = styled.h1`
    display: flex;
    justify-content: center;
    background: black;
    color: gold;
  `;
  const AppWrapper = styled.div``;
};

export default styledComponents;

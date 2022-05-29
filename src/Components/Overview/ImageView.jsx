/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import styled from 'styled-components';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import {
  ImageWrapper,
  ExpandButton,
  MainImage,
  Thumbnails,
  ThumbnailImage,
  ImageViewWrapper,
} from '../StyledComponents.jsx';

const StyledLeftArrow = styled(FaArrowAltCircleLeft)`
  transform: scale(2);
  position: absolute;
  left: 5%;
  z-index: 3;
`;

const StyledRightArrow = styled(FaArrowAltCircleRight)`
  transform: scale(2);
  position: absolute;
  right: 5%;
  z-index: 3;
`;

function ImageView(props) {
  const imageToggle = () => {
    props.click();
  };
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [CarouselData, setCarouselData] = useState(null);
  const [carLength, setCarLength] = useState(0);
  const Carousel = [];

  const nextImage = () => {
    setCurrent(current === carLength - 1 ? 0 : current + 1);
    console.log(current);
  };
  const prevImage = () => {
    setCurrent(current === 0 ? carLength - 1 : current - 1);
    console.log(current);
  };

  useEffect(() => {
    axios({
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40352/styles',
      method: 'get',
      headers: {
        Authorization: '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',
      },
    })
      .then((response) => {
        console.log('image array:', response.data.results);
        let allPics = response.data.results[0].photos;
        console.log('allPics', allPics);
        let tempLength = 0;
        for (let i = 0; i < allPics.length; i++) {
          Carousel.push(allPics[i].url);
          tempLength++;
        }
        setCarouselData(Carousel);
        setCarLength(tempLength);
        //console.log('Cardata and carlength:', CarouselData, carLength);
      })
      .then(() => {
        setLoaded(true);
      })
      .catch((err) => {
        console.log('Breaking in getOurData. Err:', err);
      });
  }, []);

  return (
    <ImageViewWrapper>
      <ExpandButton onClick={imageToggle}> Expand </ExpandButton>
      {current === 0 ? (
        ''
      ) : (
        <StyledLeftArrow className='left-arrow' onClick={prevImage} />
      )}
      {loaded
        ? CarouselData.map((picture, index) => {
            return (
              <ImageWrapper
                className={index === current ? 'slide active' : 'slide'}
                key={index}>
                {index === current && (
                  <MainImage key={index} src={picture} alt='style image' />
                )}
              </ImageWrapper>
            );
          })
        : ''}

      <Thumbnails>
        <ThumbnailImage src='https://i.imgur.com/sNZ0V4q.jpeg' />
        <ThumbnailImage src='https://i.imgur.com/sNZ0V4q.jpeg' />
        <ThumbnailImage src='https://i.imgur.com/sNZ0V4q.jpeg' />
        <ThumbnailImage src='https://i.imgur.com/sNZ0V4q.jpeg' />
      </Thumbnails>
      {current === carLength - 1 ? (
        ''
      ) : (
        <StyledRightArrow className='right-arrow' onClick={nextImage} />
      )}
    </ImageViewWrapper>
  );
}

export default hot(ImageView);

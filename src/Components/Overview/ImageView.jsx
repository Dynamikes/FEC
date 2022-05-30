import React, { useState, useEffect, useContext} from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import styled from 'styled-components';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft, FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa';
import {
  ImageWrapper,
  ExpandButton,
  MainImage,
  Thumbnails,
  ThumbnailImage,
  ImageViewWrapper,
  HighlightedStyleThumbnail,
} from '../StyledComponents.jsx';
import {MAIN_API_KEY} from '../../config.js'
import {styleIDContext} from './Overview'
import {prodIDContext} from '../../App.jsx'

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
const StyledUpArrow = styled(FaArrowAltCircleUp)`
transform: scale(1);
position: absolute;
left: 10%;
top: 5%;
z-index: 3;
`
const StyledDownArrow = styled(FaArrowAltCircleDown)`
transform: scale(1);
position: absolute;
left: 10%;
bottom: 5%;
z-index: 3;
`
function ImageView(props) {
  const imageToggle = () => {
    props.click();
  };
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [CarouselData, setCarouselData] = useState(null);
  const [thumbCarouselData, setThumbCarouselData] = useState(null)
  const [carLength, setCarLength] = useState(0);
  const [styleLoaded, setStyleLoaded] = useState(false)
  var Carousel = [];
  const thumbCarousel = [];
  const styleID = useContext(styleIDContext);
  const prodID = useContext(prodIDContext);
  
  // console.log(API_KEY)
  const nextImage = () => {
    setCurrent(current === carLength - 1 ? 0 : current + 1);
    // console.log(current);
  };
  const prevImage = () => {
    setCurrent(current === 0 ? carLength - 1 : current - 1);
    // console.log(current);
  };
 const changeCurrent = (num) => {
   setCurrent(num)
 } 
  useEffect(() => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prodID}/styles`,
      method: 'get',
      headers: {
        Authorization: MAIN_API_KEY,
      },
    })
      .then((response) => {
        console.log('image array:', response.data.results);
        let allPics = response.data.results[0].photos;
        let tempLength = 0;
        for (let i = 0; i < allPics.length; i++) {
          Carousel.push(allPics[i].url);
          tempLength++;
        }
        if (styleID === null) {
          for (let x = 0; x < response.data.results[0].photos.length; x++) {
            thumbCarousel.push(response.data.results[0].photos[x].thumbnail_url);
          }
          console.log('This is thumb carousel', thumbCarousel)
        } else {
          for (let i = 0; i < response.data.results.length; i++) {
            if (response.data.results[i].style_id === styleID) {
              Carousel = [];
              for (let y = 0; y < response.data.results[i].photos.length; y++) {
                Carousel.push(response.data.results[i].photos[y].url)
                thumbCarousel.push(response.data.results[i].photos[y].thumbnail_url)
              }
              console.log('This is carousel:', Carousel)
            }
          }
          
          
        }

        setCarouselData(Carousel);
        setCarLength(tempLength);
        setThumbCarouselData(thumbCarousel)
        
        // console.log(thumbCarousel)
      })
      .then(() => {
        setLoaded(true);
        setStyleLoaded(true)
      })
      .catch((err) => {
        console.log('Breaking in getOurData. Err:', err);
      });
  }, [styleID]);

  return (
    <ImageViewWrapper>
      <ExpandButton onClick={imageToggle}> Expand </ExpandButton>
      {current === 0 ? (
        ''
      ) : (
        <StyledUpArrow className='left-arrow'  />
      )}
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
                  <MainImage key={index} src={picture} alt='style image'  />
                )}
              </ImageWrapper>
            )
          })
        : ''}
<Thumbnails>
        {loaded
          ? thumbCarouselData.slice(0, 7).map((thumbnail, index) => {
              
            if (index === current) {
              return (
                <HighlightedStyleThumbnail
                  key={index}
                  src={thumbnail}
                  alt={'style thumbnail'}
                  
                />
              )
            } else {
              return (<ThumbnailImage
                  key={index}
                  src={thumbnail}
                  alt={'style thumbnail'}
                  onClick={() => changeCurrent(index)}
                />)
            }
            })
          : ''}
      </Thumbnails>
      {current === carLength - 1 ? (
        ''
      ) : (
        <StyledRightArrow className='right-arrow' onClick={nextImage} />
      )}
    
      {current === carLength - 1 ? (
        ''
      ) : (
        <StyledDownArrow className='right-arrow'  />
      )}
    </ImageViewWrapper>
  );
}
export default hot(ImageView);

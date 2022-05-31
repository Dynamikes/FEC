import React, { useState, useEffect, useContext} from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import styled from 'styled-components';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft, FaArrowAltCircleUp, FaArrowAltCircleDown, FaRegCircle } from 'react-icons/fa';
import {
  ImageWrapper,
  MainImage,
  Thumbnails,
  ThumbnailImage,
  ImageViewWrapper,
  HighlightedStyleThumbnail,
  AddOverlay,
  ImagePopUp,
  AddWrapper,
  ImageOverlay,
  circleRow, ExpandButton
} from '../StyledComponents.jsx';
import {MAIN_API_KEY} from '../../config.js'
import {styleIDContext} from './Overview'
import {prodIDContext} from '../../App.jsx'

const CarouselWrapper = styled.div`
  display: flex;
  overflow: hidden;
`;
const MainImageWrapper = styled.div`
  height: 300px;
  width: 300px;
  overflow: hidden;
  margin: 1rem;
`;

const StyledLeftArrow = styled(FaArrowAltCircleLeft)`
  transform: scale(2);
  z-index: 3;
  margin: 10px;
`;
const DeadLeftArrow = styled(StyledLeftArrow)`
  opacity: 0;
  user-select: none;
`;
const StyledRightArrow = styled(FaArrowAltCircleRight)`
  transform: scale(2);
  z-index: 3;
  margin: 10px;
`;
const DeadRightArrow = styled(StyledRightArrow)`
  opacity: 0;
  user-select: none;
`;
const ExpandedRightArrow = styled(StyledRightArrow)`
top: 50%;
`
const ExpandedLeftArrow = styled(StyledLeftArrow)`
top: 50%;
`
const StyledUpArrow = styled(FaArrowAltCircleUp)`
transform: scale(1);
left: 10%;
top: 5%;
z-index: 3;
margin: 10px;
`
const DeadUpArrow = styled(StyledUpArrow)`
  opacity: 0;
  user-select: none;
`;
const StyledDownArrow = styled(FaArrowAltCircleDown)`
transform: scale(1);
left: 10%;
bottom: 5%;
z-index: 3;
margin: 10px;
`
const DeadDownArrow = styled(StyledDownArrow)`
  opacity: 0;
  user-select: none;
`;
const ThumbCircle = styled(FaRegCircle)`

`
const HighlightCircle = styled(FaRegCircle)`
border: 2px solid #dadada;
border-radius: 7px;
outline: none;
border-color: #9ecaed;
box-shadow: 0 0 10px #9ecaed;
`
function ImageView(props) {
  const imageToggle = () => {
    props.click();
  };
  const [current, setCurrent] = useState(0);
  const [vertCurrent, setVertCurrent] = useState([0, 7]);
  const [loaded, setLoaded] = useState(false);
  const [CarouselData, setCarouselData] = useState(null);
  const [thumbCarouselData, setThumbCarouselData] = useState(null)
  const [carLength, setCarLength] = useState(0);
  const [styleLoaded, setStyleLoaded] = useState(false)
  const [currentPicture, setCurrentPicture] = useState('');
  var Carousel = [];
  const thumbCarousel = [];
  const styleID = useContext(styleIDContext);
  const prodID = useContext(prodIDContext);
  const [clicked, setClicked] = useState(false)

  useEffect(()=> {
    if (current === vertCurrent[1]) {
      setVertCurrent([vertCurrent[0] + 1, vertCurrent[1] + 1])
    }
     else if (current === vertCurrent[0] && current !== 0) {
      setVertCurrent([vertCurrent[0] - 1, vertCurrent[1] - 1])
    }
  }, [current])
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
 const changeVertCurrent = (x) => {
   if (vertCurrent[1] < CarouselData.length && x === 'down') {
    setVertCurrent([vertCurrent[0] + 1, vertCurrent[1] + 1])
    console.log(vertCurrent)
   } else if (vertCurrent[0] > 0 && x === 'up') {
     setVertCurrent([vertCurrent[0] - 1, vertCurrent[1] - 1])
     console.log(vertCurrent)
   }
 }
 const toggleDefault = () => {
   setClicked(!clicked)
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
        //console.log('image array:', response.data.results);
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
    <ImageViewWrapper className='ImageViewWrapper'>
      {clicked &&
      <ImageOverlay>

        <div className="modalWrapper">

       <ExpandButton onClick={toggleDefault}> Back </ExpandButton>
      {current === 0 ? (
        <DeadLeftArrow />
      ) : (
        <ExpandedLeftArrow className='left-arrow' onClick={prevImage} />
      )}


      {loaded
        ? CarouselData.map((picture, index) => {

            return (
              <ImageWrapper
                className={index === current ? 'slide active' : 'slide'}
                key={index}>
                {index === current && (
                  <MainImage key={index} src={picture} alt='style image' onClick={() => {setCurrentPicture(picture), setClicked(true)}} />
                )}
              </ImageWrapper>
            )
          })
        : ''}

      {current === carLength - 1 ? (
        ''
      ) : (
        <ExpandedRightArrow className='right-arrow' onClick={nextImage} />
      )}

    </div>
    <circleRow>
        {loaded
          ? CarouselData.slice(vertCurrent[0], vertCurrent[1]).map((thumbnail, index) => {

            if (thumbnail === CarouselData[current]) {
              return (
                <HighlightCircle key={index}
                />
              )
            } else {
              return (<ThumbCircle key={index}
                />)
            }
            })
          : ''}
      </ circleRow>
      </ImageOverlay> }

        {/* DEFAULT VIEW HERE */}
      <Thumbnails>
      {vertCurrent[0] === 0 ? (
        <DeadUpArrow/>
      ) : (
        <StyledUpArrow className='left-arrow'  onClick={() => changeVertCurrent('up')} />
      )}
        {loaded
          ? CarouselData.slice(vertCurrent[0], vertCurrent[1]).map((thumbnail, index) => {

            if (thumbnail === CarouselData[current]) {
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
          {vertCurrent[1] === carLength - 1 ? (
        <DeadDownArrow/>
      ) : (
        <StyledDownArrow className='right-arrow'  onClick={() => changeVertCurrent('down')} />
      )}
      </Thumbnails>
      {/* ARROWS START HERE */}
      {current === 0 ? (
        <DeadLeftArrow />
      ) : (
        <StyledLeftArrow className='left-arrow' onClick={prevImage} />
      )}
      <CarouselWrapper className='CarouselWrapper'>
      {loaded
        ?
        CarouselData.map((picture, index) => {
            return (
              <ImageWrapper
                className={index === current ? 'slide active' : 'slide'}
                key={index}>
                {index === current && (
                  <MainImageWrapper>
                    <MainImage key={index} src={picture} alt='style image' onClick={() => {setCurrentPicture(picture), setClicked(true)}} />
                  </MainImageWrapper>
                )}
              </ImageWrapper>
            )
          })
        : null}
        </CarouselWrapper>
      {current === carLength - 1 ? (
        <DeadRightArrow/>
      ) : (
        <StyledRightArrow className='right-arrow' onClick={nextImage} />
      )}
    </ImageViewWrapper>
  );
}
export default hot(ImageView);
{/* {clicked === 'expanded' ?
      <AddOverlay onClick={() => setCurrentPicture('')}>
          <AddWrapper>
            {current === 0 ? (
          ''
        ) : (
          <ZoomedLeftArrow className='left-arrow' onClick={prevImage} />
        )}
            <ImagePopUp src={currentPicture} />
            {current === carLength - 1 ? (
        ''
      ) : (
        <ZoomedRightArrow className='right-arrow' onClick={nextImage} />
      )}
          </AddWrapper>
        </AddOverlay>
        :
        null

      } */}
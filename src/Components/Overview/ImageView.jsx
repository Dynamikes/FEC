/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext, useRef } from "react";
import { hot } from "react-hot-loader/root";
import axios from "axios";
import styled from "styled-components";
import {
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
  FaArrowAltCircleUp,
  FaArrowAltCircleDown,
  FaRegCircle,
} from "react-icons/fa";
import {
  ImageWrapper,
  Thumbnails,
  ThumbnailImage,
  ImageViewWrapper,
  HighlightedStyleThumbnail,
  AddOverlay,
  ImagePopUp,
  AddWrapper,
  ImageOverlay,
  CircleRow,
  ExpandButton,
  CarouselWrapper,
  MainImageWrapper,
  ImageOverlayContainer,
  StyledLeftArrow,
  DeadLeftArrow,
  StyledRightArrow,
  DeadRightArrow,
  ExpandedRightArrow,
  ExpandedLeftArrow,
  StyledUpArrow,
  DeadUpArrow,
  StyledDownArrow,
  DeadDownArrow,
  ThumbCircle,
  HighlightCircle,
  MainImage,
  Target,
  Container,
} from "../StyledComponents.jsx";
import { MAIN_API_KEY } from "../../config.js";
import { styleIDContext } from "./Overview";
import { prodIDContext } from "../../App.jsx";
import { relativeTimeThreshold } from "moment";

function ImageView(props) {
  const imageToggle = () => {
    props.click();
  };
  const [current, setCurrent] = useState(0);
  const [vertCurrent, setVertCurrent] = useState([0, 7]);
  const [loaded, setLoaded] = useState(false);
  const [CarouselData, setCarouselData] = useState(null);
  const [thumbCarouselData, setThumbCarouselData] = useState(null);
  const [carLength, setCarLength] = useState(0);
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [currentPicture, setCurrentPicture] = useState("");

  var Carousel = [];
  const thumbCarousel = [];
  const styleID = useContext(styleIDContext);
  let prodID = useContext(prodIDContext);
  const [clicked, setClicked] = useState(false);
  var name = "";

  useEffect(() => {
    if (current === vertCurrent[1]) {
      setVertCurrent([vertCurrent[0] + 1, vertCurrent[1] + 1]);
    } else if (current === vertCurrent[0] && current !== 0) {
      setVertCurrent([vertCurrent[0] - 1, vertCurrent[1] - 1]);
    }
  }, [current]);
  const nextImage = () => {
    setCurrent(current === carLength - 1 ? 0 : current + 1);
  };
  const prevImage = () => {
    setCurrent(current === 0 ? carLength - 1 : current - 1);
  };
  const changeCurrent = (num) => {
    setCurrent(num);
  };
  const changeVertCurrent = (x) => {
    if (vertCurrent[1] < CarouselData.length && x === "down") {
      setVertCurrent([vertCurrent[0] + 1, vertCurrent[1] + 1]);
      console.log("vertCurrent", vertCurrent[1]);
      console.log("carlength", carLength);
    } else if (vertCurrent[0] > 0 && x === "up") {
      setVertCurrent([vertCurrent[0] - 1, vertCurrent[1] - 1]);
      console.log("vertCurrent", vertCurrent[1]);
      console.log("carlength", carLength);
    }
  };
  const toggleDefault = () => {
    setClicked(!clicked);
  };
  useEffect(() => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prodID}/styles`,
      method: "get",
      headers: {
        Authorization: MAIN_API_KEY,
      },
    })
      .then((response) => {
        let allPics = response.data.results[0].photos;
        let tempLength = 0;
        for (let i = 0; i < allPics.length; i++) {
          Carousel.push(allPics[i].url);
          tempLength++;
        }
        if (styleID === null) {
          for (let x = 0; x < response.data.results[0].photos.length; x++) {
            thumbCarousel.push(
              response.data.results[0].photos[x].thumbnail_url
            );
          }
          name = response.data.results[0].name;
          let tempID = response.data.results[0].style_id;
          props.changeStyleID(tempID);
        } else {
          for (let i = 0; i < response.data.results.length; i++) {
            if (response.data.results[i].style_id === styleID) {
              Carousel = [];
              for (let y = 0; y < response.data.results[i].photos.length; y++) {
                Carousel.push(response.data.results[i].photos[y].url);
                thumbCarousel.push(
                  response.data.results[i].photos[y].thumbnail_url
                );
                name = response.data.results[i].name;
              }
            }
          }
        }
        setCarouselData(Carousel);
        setCarLength(tempLength);
        setThumbCarouselData(thumbCarousel);
      })
      .then(() => {})
      .then(() => {
        setLoaded(true);
        setStyleLoaded(true);
      })
      .catch((err) => {
        console.log("Breaking in getOurData. Err:", err);
      });
  }, [styleID, prodID]);
  //>>>>>>>>>>>>>ZOOM HANDLING>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [opacity, setOpacity] = useState(0);
  const [offset, setOffset] = useState({ left: 50, top: 50 });
  const [backOpacity, setBackOpacity] = useState(1);

  const sourceRef = useRef(null);
  const targetRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    setOpacity(1);
    setBackOpacity(0);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setBackOpacity(1);
  };

  const handleMouseMove = () => {
    const targetRect = targetRef.current.getBoundingClientRect();
    const sourceRect = sourceRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const xRatio = (targetRect.width - containerRect.width) / sourceRect.width;
    const yRatio =
      (targetRect.height - containerRect.height) / sourceRect.height;

    const left = Math.max(
      Math.min(event.pageX - sourceRect.left, sourceRect.width),
      0
    );
    const top = Math.max(
      Math.min(event.pageY - sourceRect.top, sourceRect.height),
      0
    );
    setOffset({
      left: left * -xRatio,
      top: top * -yRatio,
    });
  };
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // const handleMouseMove = (e) => {
  //   const DOMRect = carouselContent.current.getBoundingClientRect();
  //   const {
  //     height, width, left: offsetLeft, top: offsetTop,
  //   } = DOMRect;
  //   const x = ((e.pageX - offsetLeft) / width) * 100;
  //   const y = ((e.pageY - offsetTop) / height) * 100;
  //   setMouseX(x);
  //   setMouseY(y);
  // };

  // const transformOrigin = {
  //   transformOrigin: `${mouseX}% ${mouseY}%`,
  // };
  // const imageDivStyle = {
  //   backgroundRepeat: 'no-repeat',
  //   backgroundPosition: 'center',
  //   transition: 'transform .2s ease-out',
  //   backgroundImage: `url(${galleryImages[currentGalleryIndex]})`,
  // };

  //   <div
  //     style={{
  //       ...imageDivStyle,
  //       transform: zoom ? `scale()` : 'scale(1)',
  //       cursor: zoom ? 'zoom-out' : 'zoom-in',
  //       ...transformOrigin,
  //     }}
  //     className="gallery-image"
  //   />
  //   const handleImageClick = () => {
  //     setZoom((prevState) => !prevState);
  //   };

  // const [zoom, setZoom] = useState(false);
  //   const [mouseX, setMouseX] = useState(null);
  //   const [mouseY, setMouseY] = useState(null);
  //   const zoomScale = 1.75;
  //   const carouselContent = useRef(null);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  return (
    <ImageViewWrapper className="ImageViewWrapper">
      {clicked && (
        <ImageOverlay>
          <div className="modalWrapper">
            <ExpandButton onClick={toggleDefault}> Back </ExpandButton>

            {current === 0 ? (
              <DeadLeftArrow />
            ) : (
              <ExpandedLeftArrow className="left-arrow" onClick={prevImage} />
            )}

            <ImageOverlayContainer className="ImageOverlayContainer">
              <Container
                ref={containerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              >
                {loaded
                  ? CarouselData.map((picture, index) => {
                      return (
                        <ImageWrapper
                          className={
                            index === current ? "slide active" : "slide"
                          }
                          key={index}
                        >
                          {index === current && (
                            <MainImage
                              key={index}
                              src={picture}
                              alt="style image"
                              onClick={() => {
                                setCurrentPicture(picture),
                                  setClicked(true),
                                  setOpacity(1);
                              }}
                              ref={sourceRef}
                            />
                          )}
                          {/* <TargetDiv  className="targetDiv"> */}
                          <Target
                            className="ZoomedImage"
                            ref={targetRef}
                            alt="target"
                            opacity={opacity}
                            offset={offset}
                            src={currentPicture}
                          />
                          {/* </TargetDiv> */}
                        </ImageWrapper>
                      );
                    })
                  : ""}
              </Container>
            </ImageOverlayContainer>
            {current === carLength - 1 ? (
              ""
            ) : (
              <ExpandedRightArrow className="right-arrow" onClick={nextImage} />
            )}
          </div>
          <CircleRow>
            {loaded
              ? CarouselData.slice(vertCurrent[0], vertCurrent[1]).map(
                  (thumbnail, index) => {
                    if (thumbnail === CarouselData[current]) {
                      return <HighlightCircle key={index} />;
                    } else {
                      return <ThumbCircle key={index} />;
                    }
                  }
                )
              : ""}
          </CircleRow>
        </ImageOverlay>
      )}

      {/* DEFAULT VIEW HERE */}
      <Thumbnails>
        {vertCurrent[0] === 0 ? (
          <DeadUpArrow />
        ) : (
          <StyledUpArrow
            className="left-arrow"
            onClick={() => changeVertCurrent("up")}
          />
        )}
        {loaded
          ? CarouselData.slice(vertCurrent[0], vertCurrent[1]).map(
              (thumbnail, index) => {
                if (thumbnail === CarouselData[current]) {
                  return (
                    <HighlightedStyleThumbnail
                      key={index}
                      src={thumbnail}
                      alt={"style thumbnail"}
                    />
                  );
                } else {
                  return (
                    <ThumbnailImage
                      key={index}
                      src={thumbnail}
                      alt={"style thumbnail"}
                      onClick={() => changeCurrent(index)}
                    />
                  );
                }
              }
            )
          : ""}
        {vertCurrent[1] > carLength || vertCurrent[1] === carLength ? (
          <DeadDownArrow className="deadarrow" />
        ) : (
          <StyledDownArrow
            className="right-arrow"
            onClick={() => changeVertCurrent("down")}
          />
        )}
      </Thumbnails>
      {/* ARROWS START HERE */}
      {current === 0 ? (
        <DeadLeftArrow />
      ) : (
        <StyledLeftArrow className="left-arrow" onClick={prevImage} />
      )}
      <CarouselWrapper className="CarouselWrapper">
        {loaded
          ? CarouselData.map((picture, index) => {
              return (
                <ImageWrapper
                  className={index === current ? "slide active" : "slide"}
                  key={index}
                >
                  {index === current && (
                    <MainImageWrapper>
                      <MainImage
                        key={index}
                        src={picture}
                        alt="style image"
                        onClick={() => {
                          setCurrentPicture(picture), setClicked(true);
                        }}
                      />
                    </MainImageWrapper>
                  )}
                </ImageWrapper>
              );
            })
          : null}
      </CarouselWrapper>
      {current === carLength - 1 ? (
        <DeadRightArrow />
      ) : (
        <StyledRightArrow className="right-arrow" onClick={nextImage} />
      )}
    </ImageViewWrapper>
  );
}
export default hot(ImageView);
{
  /* {clicked === 'expanded' ?
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

      } */
}

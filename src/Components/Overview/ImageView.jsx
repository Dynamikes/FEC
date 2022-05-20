import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import styled from 'styled-components';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const ImageWrapper = styled.section`
  position: relative;
  background: blanchedalmond;
  display: flex;
  width: 100%;
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
// width: calc(80/thumbnailarray.length)%
const ThumbnailImage = styled.img`
  height: auto;
`;

// width: ${props => (props.dogWidth ? '79% : 100%)}')}

// {onClick(if that thing has props remove // inverse
//   thatthing.props = dogWidth)}

class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      imageData: null,
    };
  }

  componentDidMount() {
    axios
      .get('/products/:product_id/styles')
      .then((response) => {
        this.setState({
          imageData: response,
        });
      })
      .catch((err) => {
        console.log('Breaking in ImageView componentDidMount. Err:', err);
        return err;
      });
  }

  render() {
    return (
      <ImageWrapper>
        <ExpandButton> Expand </ExpandButton>
        <Thumbnails>
          <ThumbnailImage src='https://i.imgur.com/sNZ0V4q.jpeg' />
          <ThumbnailImage src='https://i.imgur.com/sNZ0V4q.jpeg' />
          <ThumbnailImage src='https://i.imgur.com/sNZ0V4q.jpeg' />
          <ThumbnailImage src='https://i.imgur.com/sNZ0V4q.jpeg' />
        </Thumbnails>
        <FaArrowAltCircleLeft className='left-arrow' />
        <DogImage src='https://i.imgur.com/sNZ0V4q.jpeg'></DogImage>
        <FaArrowAltCircleRight className='right-arrow' />
      </ImageWrapper>
    );
  }
}

export default hot(ImageView);
{
  /* <DogImage src='https://i.imgur.com/sNZ0V4q.jpeg'></DogImage> */
}

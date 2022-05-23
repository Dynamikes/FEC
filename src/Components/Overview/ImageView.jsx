import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
//import styled from 'styled-components';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import {
  ImageWrapper,
  ExpandButton,
  MainImage,
  Thumbnails,
  ThumbnailImage,
} from '../StyledComponents.jsx';

class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      imageData: null,
    };
    this.imageToggle = this.imageToggle.bind(this);
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

  imageToggle() {
    this.props.click();
  }
  render() {
    return (
      <ImageWrapper>
        <ExpandButton onClick={this.imageToggle}> Expand </ExpandButton>
        <FaArrowAltCircleLeft className='left-arrow' size='2em' />
        <MainImage src='https://i.imgur.com/sNZ0V4q.jpeg'></MainImage>
        <Thumbnails>
          <ThumbnailImage src='https://i.imgur.com/sNZ0V4q.jpeg' />
          <ThumbnailImage src='https://i.imgur.com/sNZ0V4q.jpeg' />
          <ThumbnailImage src='https://i.imgur.com/sNZ0V4q.jpeg' />
          <ThumbnailImage src='https://i.imgur.com/sNZ0V4q.jpeg' />
        </Thumbnails>
        <FaArrowAltCircleRight className='right-arrow' size='2em' />
      </ImageWrapper>
    );
  }
}

export default hot(ImageView);

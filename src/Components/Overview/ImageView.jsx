import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import styled from 'styled-components';

const Title = styled.h3`
  text-align: center;
  color: violetred;
`;
const Wrapper = styled.section`
  background: papayawhip;
  width: 70%;
`;

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
      <Wrapper>
        <Title>ImageView</Title>
        <img src='https://i.imgur.com/sNZ0V4q.jpeg' height='auto' width='100%' />
      </Wrapper>
    );
  }
}

export default hot(ImageView);

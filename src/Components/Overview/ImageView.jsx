import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';

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
      <div>
        <h3>ImageView</h3>
      </div>
    );
  }
}

export default hot(ImageView);

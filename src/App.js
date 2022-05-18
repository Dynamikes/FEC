
import React from "react";
import { hot } from 'react-hot-loader/root';

class App extends React.Component {
  constructor(props) {
   super(props)
  }
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          Hello {name}
        </h1>
      </>
    );
  }
}

export default hot(App);

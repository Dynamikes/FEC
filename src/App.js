<<<<<<< HEAD
import React from 'react';
=======
import React from "react";
>>>>>>> 8d0d22393fff19621c74dd3905cb39cf400f915c
import { hot } from 'react-hot-loader/root';
import Overview from './Components/Overview/Overview.js';
import Reviews from './Components/Reviews/Reviews.js';
import Related_Products from './Components/Related_Products/Related_Products.js';
import Q_A from './Components/Q_A/Q_A.js';

<<<<<<< HEAD
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>Hello {name}</h1>
=======

const App = (props) => {
    const name = props.name;
    return (
      <>
        <h1>
          Hello {name}
        </h1>
        <Overview />
        <Reviews />
        <Related_Products />
        <Q_A />
>>>>>>> 8d0d22393fff19621c74dd3905cb39cf400f915c
      </>
    );
  }

export default hot(App);

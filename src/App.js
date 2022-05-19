import React from 'react';
import { hot } from 'react-hot-loader/root';
import Overview from './Components/Overview/Overview.js';
import Reviews from './Components/Reviews/Reviews.js';
import Related_Products from './Components/Related_Products/Related_Products.js';
import Q_A from './Components/Q_A/Q_A.js';
import Counter from './Counter.js';
import Link from './Link.js';

const App = (props) => {
  const name = props.name;
  return (
    <>
      <h1>Hello {name}</h1>
      <Overview />
      <Reviews />
      <Related_Products />
      <Q_A />
      <Counter />
      <Link />
    </>
  );
};

export default hot(App);

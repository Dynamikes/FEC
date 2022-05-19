//import React from 'react';
const react = require('react');
// import ReactTestUtils from 'react-dom/test-utils';
// import { hot } from 'react-hot-loader/root';
// import ReactDOM from 'react-dom/client';
const ReactDOM = require('react-dom/client');
//  import { act } from 'react-dom/test-utils';
const act = require('react-dom/test-utils').act;
//  import Counter from '../Counter';
 const Counter = require('../Counter');

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and update a counter', () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.createRoot(container).render(<Counter />);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('You clicked 0 times');

  // Test second render and componentDidUpdate
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('You clicked 1 times');
  expect(document.title).toBe('You clicked 1 times');
});
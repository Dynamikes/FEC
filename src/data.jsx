
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import config from './config.js'

export let products = [];
let stylesArray = [];
export let finishedProducts;
//-----------------------------------------------------------------------//
//GET REQUEST TO PRODUCT
//-----------------------------------------------------------------------//
const getAllProducts = async () => {
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/',
    method: 'get',
    headers: {
      Authorization: config.API_KEY,
    },
  })
    .then((response) => {
      products.push(response.data);
      console.log('this is all data: ', response.data);
    })
    .catch((err) => {
      console.log('Breaking in getOurData. Err:', err);
    });
  console.log('products:', products);
};
getAllProducts();
//-----------------------------------------------------------------------//
//GET REQUEST TO STYLES
//-----------------------------------------------------------------------//
const updateStyles = () => {
  products.forEach((product) => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product['id']}/styles`,
      method: 'get',
      headers: {
        Authorization: config.API_KEY,
      },
    })
      .then((response) => {
        stylesArray.push(response.data);
      })
      .catch((err) => {
        console.log('Breaking in getOurData. Err:', err);
      });
  });
};
updateStyles();

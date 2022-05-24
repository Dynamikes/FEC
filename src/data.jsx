//All get requests live here
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

export let products = [];
let stylesArray = [];
export let finishedProducts;
//-----------------------------------------------------------------------//
//GET REQUEST TO PRODUCT
//-----------------------------------------------------------------------//
const updateProducts = async () => {
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/',
    method: 'get',
    headers: {
      Authorization: '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',
    },
  })
    .then((response) => {
      products.push(response.data);
      console.log(response.data);
    })
    .catch((err) => {
      console.log('Breaking in getOurData. Err:', err);
    });
  console.log('products:', products);
};
updateProducts();
//-----------------------------------------------------------------------//
//GET REQUEST TO STYLES
//-----------------------------------------------------------------------//
const updateStyles = () => {
  products.forEach((product) => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product['id']}/styles`,
      method: 'get',
      headers: {
        Authorization: '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',
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

'use strict'

const express = require('express');
const router = express.Router();
const {Product} = require('../database/dbInit');

module.exports = router;

// Since everything is driven by React on the front end
// Routes only sends query to DB and sends information
// back to client

router.get('/', async (req, res, next)=>{
  try{
    res.json(await Product.findAll());
  }
  catch(e){
    console.log(e);
    next(e);
  }
});

router.put('/:id/change', async (req, res, next)=> {
  try{
    const newProduct = req.body;
//    console.log(newProduct);
    const changed = await Product.update({status: newProduct.status}, {
      where: { id: newProduct.id },
      returning: true
    });
//    console.log(changed[1][0].status);
    res.status(202).send(`status=${changed[1][0].status}`);
  }
  catch(e){
    res.status(400).send();
  }
});

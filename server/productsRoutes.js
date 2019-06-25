'use strict'
const express = require('express');
const router = express.Router();
const Badwords = require('bad-words');
const BWFilter = new Badwords({ placeHolder: 'x'});

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

router.put('/:id/update', async (req, res, next)=> {
  try{
    const newProduct = req.body;
    const changed = await Product.update({status: newProduct.status}, {
      where: { id: newProduct.id },
      returning: true
    });
    res.status(202).json(changed[1][0].updatedAt);
  }
  catch(e){
    res.status(400).send();
  }
});

router.post('/create', (req, res, next)=> {
  try{
    let newProduct = req.body;
    newProduct.name = BWFilter.clean(newProduct.name);
    Product.create(newProduct).then(res.redirect("/"));
  }
  catch(e){
    console.log("Whelp that didn't work");
    console.log(e);
  }
});

import React from 'react';
import axios from 'axios';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';

import NavButton from './NavButton';
import ProductList from './ProductList';
import {itemsCount} from './functions';

export default class Main extends React.Component {
  constructor() {
    super();
    this.setActive = this.setActive.bind(this);
    this.changeProductStatus = this.changeProductStatus.bind(this);
    this.resetErrorTimer = this.resetErrorTimer.bind(this);
    this.state = {
      products: [],
      active: "All Products",
      error: false
    };
  }

  setActive(e) {
    this.setState({active: e.target.value});
  }

  async changeProductStatus(e) {
    const id = e.target.getAttribute("data-id");
    const to = e.target.value;
    const product = this.state.products.find((p)=> Number(p.id) === Number(id));
    const newProduct = Object.assign({}, product);
    newProduct.status = to;

    const check = await axios.put(`/products/api/${id}/change`, newProduct);
    if(check.status === 202){
      const products = [...this.state.products];
      products.splice(products.findIndex(p => Number(p.id) === Number(id)), 1, newProduct);
      this.setState({products});
    }
    else {
      this.setState({error: true});
      setTimeout(this.resetErrorTimer, 2000);
    }
  }

  resetErrorTimer() {
    this.setState({error: false});
  }

  componentDidMount() {
    axios.get('/products/api').then((products) => this.setState({products: products.data}));    
  }

  render() {
    const {products, active} = this.state;
    const IC = itemsCount(products);
    return (
      <div>
        <h1>Acme Inventory</h1>
        {this.state.error ? <p className="error">There was an error with the update</p>: null}
        <hr/>
        <div className="navButtons">
          <NavButton name={"All Products"} quantity={IC.products} active={active} setActive={this.setActive} />
          <NavButton name={"INSTOCK"} quantity={IC.inStock} active={active} setActive={this.setActive}  />
          <NavButton name={"BACKORDERED"} quantity={IC.backOrdered} active={active} setActive={this.setActive}  />
          <NavButton name={"DISCONTINUED"} quantity={IC.discontinued} active={active} setActive={this.setActive}  />
        </div>
        <ProductList products={products} active={active} cps={this.changeProductStatus}/>
      </div>
    );
  }
}


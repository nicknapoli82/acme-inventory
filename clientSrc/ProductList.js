import React from 'react';

export default function ProductList(props) {
  const {products, active, cps} = props;
  return(
    <div className="productList">
      {
        products.map(p => <SingleProduct key={p.id} p={p} a={active} cps={cps}/>)
      }
    </div>
  );
}

function SingleProduct(props) {
  const {p, a, cps} = props;
  if (p.status === a || a === "All Products") {
    return(
      <div className="singleProduct">
        <p className="productName">{p.name}</p>
        <p>Updated on {p.updatedAt}</p>
        <select defaultValue={p.status} data-id={p.id} onChange={cps}>
          <option value="INSTOCK">INSTOCK</option>
          <option value="BACKORDERED">BACKORDERED</option>
          <option value="DISCONTINUED">DISCONTINUED</option>          
        </select>
      </div>
    );
  }
  else return null;
}

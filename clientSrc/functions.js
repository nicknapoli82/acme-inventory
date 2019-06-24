function itemsCount(products) {
  const IC = { products: 0, inStock: 0, backOrdered: 0, discontinued: 0 };
  if(products.length) {
    for (let item in products) {
      switch(products[item].status){
      case "INSTOCK":
        IC.products += 1;
        IC.inStock += 1;
        break;
      case "BACKORDERED":
        IC.products += 1;
        IC.backOrdered += 1;
        break;
      case "DISCONTINUED":
        IC.products += 1;
        IC.discontinued += 1;
        break;
      }
    }
  }
  return IC;
}

export {itemsCount};

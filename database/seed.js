const Sequelize = require('sequelize');
const {database, Product} = require('./dbInit');

const products = [
  {
    name: "A Chingadero",
    status: "INSTOCK"
  },
  {
    name: "Another chingadero",
    status: "BACKORDERED"
  }
];

async function seed() {
  await database.sync({force: true});

  await Promise.all(products.map(p =>{
    return Product.create(p);
  }));

  database.close();
}

seed();

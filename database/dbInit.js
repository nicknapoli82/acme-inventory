'use strict'

const Sequelize = require('sequelize');

//const PORT = process.env.DATABASE_URL || 'postgres://acme-inventory-nick';

const database = new Sequelize(process.env.DATABASE_URL || 'postgres://acme-inventory-nick', {
  logging: false
});

const Product = database.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('INSTOCK', 'BACKORDERED', 'DISCONTINUED'),
    defaultValue: 'INSTOCK'
  }
});

database.sync({ force: true }).then(() => {
  Product.create({
    name: "A Chingadero",
    status: "INSTOCK"
  });
  Product.create({
    name: "A Thingamado",
    status: "INSTOCK"
  });
});

module.exports = {
  database,
  Product
};

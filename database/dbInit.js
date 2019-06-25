'use strict'

const Sequelize = require('sequelize');

const PORT = process.env.DATABASE_URL || 5432;

const database = new Sequelize(`postgres://localhost:${PORT}/products`, {
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

module.exports = {
  database,
  Product
};

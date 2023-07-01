const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Cart_item = sequelize.define('Cart_item',{
  id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true,
  },
  quantity:{
    type:Sequelize.INTEGER
  }
});
module.exports=Cart_item;
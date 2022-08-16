module.exports = (sequelize, dataTypes) => {
  const Cart = sequelize.define('Cart', {
    items: {
      type: dataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps:false,
  })

  return Cart;
}
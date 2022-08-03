module.exports = (sequelize, dataTypes) => {
    const SbCategory = sequelize.define('sbCategory', {
      name: {
      type: dataTypes.STRING(45),
      allowNull: false,  
      }
    },
    {
      timestamps:false
    })
    
    SbCategory.associate = function(db) {
        SbCategory.belongsTo(db.Category,{as: 'category'})
        SbCategory.hasMany(db.Product)
    }

    return SbCategory;
  }
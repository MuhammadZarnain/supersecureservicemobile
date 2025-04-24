// models/User.js


module.exports = (sequelize, DataTypes) => {return sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },  
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

})
};

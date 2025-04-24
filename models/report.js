


module.exports = (sequelize, DataTypes) => {return sequelize.define('report',  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Foreign key to associate a Report with a User
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Ensure this matches the table name used by your User model
        key: 'id',
      },
    },
  })};
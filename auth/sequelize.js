const Sequelize = require('sequelize');
const dotEnv = require('dotenv')
dotEnv.config();

const user = require('../models/User');
const report = require('../models/report');

const sequelize = new Sequelize("postgres","postgres.tfrnrryaupdwvwyrdycu","@#Osman123#@",{
    port:6543,
    host:"aws-0-ap-south-1.pooler.supabase.com",
    dialect: 'postgres',
    pool:{
        max:10,
        min:0,
        idle:10000
    },
});

const User = user(sequelize,Sequelize);
const Report = report(sequelize,Sequelize);

sequelize.sync()  // Set `force: false` to avoid dropping the table
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

module.exports = {sequelize,User,Report};
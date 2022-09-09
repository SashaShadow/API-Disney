import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    'AlkemyDisney',
    'sasha',
    '745431',
     {
       host: 'localhost',
       dialect: 'mariadb'
     }
   );

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

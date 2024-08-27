import Sequelize from 'sequelize'


const sequelize = new Sequelize('ecommerce_235', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})
const connection = async () => {

    try {

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
export default connection

const { Sequelize, DataTypes, Model } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_MDP, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  })

class Product extends Model {
    static associate(models) {
        //association avec d'autres models
        models.Product.belongsTo(models.User, { foreignKey: 'autorId', onDelete: 'cascade'})
    }
}

Product.init({
    productId: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    manufacturer: {
        type: DataTypes.STRING(255),
        allowNull:false
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price : {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    link : {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    like: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: []
    },
    autorId: {
        type: DataTypes.BIGINT(11),
        allowNull: false
    }
},{
    sequelize,
    modalName: 'Product'
})

module.exports = sequelize.model('Product')
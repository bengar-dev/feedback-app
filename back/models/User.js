const { Sequelize, DataTypes, Model } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_MDP, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  })

class User extends Model {
    static associate(models) {
        //association avec d'autres models
        models.User.hasMany(models.Product, {foreignKey: 'id', onDelete: 'cascade'})
    }
}

User.init({
    id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    lastname : {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    biography : {
        type: DataTypes.TEXT,
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING(255),
        defaultValue: 'https://www.belin.re/wp-content/uploads/2018/11/default-avatar.png'
    },
    rank: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    modalName: 'User'
})

module.exports = sequelize.model('User')
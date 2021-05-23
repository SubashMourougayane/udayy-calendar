'use strict';

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define(
    "users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }

  );

  users.associate = (models) => {
  }

  users.createUser = async (user) => {
    return await users.create(user);
  }
  users.login = async (userObj) => {
    return await users.findOne({
      where: {
        email: userObj.email
      },
      attributes: ['id', 'email', 'password']
    })
  }


  return users;
}
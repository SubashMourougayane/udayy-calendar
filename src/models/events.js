'use strict';

const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  var events = sequelize.define(
    "events",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      startDate: {
        type: DataTypes.DATE
      },
      endDate: {
        type: DataTypes.DATE
      },
      startTime: {
        type: DataTypes.TIME
      },
      endTime: {
        type: DataTypes.TIME
      },
      isRecurring: {
        type: DataTypes.BOOLEAN
      },
      recurringType: {
        type: DataTypes.STRING
      },
      daysOfWeek: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      },
      uniqueTag: {
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

  events.associate = (models) => {
  }




  return events;
}
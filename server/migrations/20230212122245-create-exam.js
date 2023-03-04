'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exams', {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        default: sequelize.fn('uuid_generate_v4'),
        primaryKey: true,
      },
      question_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'Questions',
            key: 'id',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      class_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'Classes',
            key: 'id',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      result: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exams');
  },
};

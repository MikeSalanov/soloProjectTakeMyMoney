'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'ownerId' });
    }
  }
  Project.init({
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    ownerId: DataTypes.INTEGER,
    rating: DataTypes.BIGINT,
    balance: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ RefreshToken, Project }) {
      this.hasMany(RefreshToken, { foreignKey: 'userId' });
      this.hasMany(Project, { foreignKey: 'ownerId' });
    }
  }
  User.init({
    login: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
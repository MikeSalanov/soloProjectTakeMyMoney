/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const { RefreshToken, User, Project } = require('../db/models/index');

class Person {
  #login;

  constructor(login) {
    this.#login = login;
  }

  get login() {
    return this.#login;
  }

  async validateAuth(password) {
    const user = await User.findOne({ where: { login: this.login } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid user credentials');
    }
  }

  async validateRegister() {
    const isExists = !!(await User.findOne({ where: { login: this.login } }));
    if (isExists) {
      throw new Error('User already exists');
    }
    return isExists;
  }

  async addRefreshTokenToUser(refreshToken) {
    const { dataValues } = await User.findOne({
      where: { login: this.login },
    });
    await RefreshToken.create({
      token: refreshToken,
      userId: dataValues.id,
      isValid: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  async toRegister(password) {
    await User.create({
      login: this.login,
      password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  async toGetAllRefreshSessions() {
    return (await User.findAll({
      include: [
        {
          model: RefreshToken,
          required: true,
        },
      ],
      where: { login: this.login },
      raw: true,
      nest: true,
    })).map((record) => record.Refresh_tokens);
  }

  async toGetRefreshToken(refreshToken) {
    const resultOfInnerJoinSelectOfRefreshTokenData = await RefreshToken.findOne({
      include: [
        {
          model: User,
          required: true,
        },
      ],
      where: { token: refreshToken },
      raw: true,
      nest: true,
    });
    return resultOfInnerJoinSelectOfRefreshTokenData;
  }

  async toMakeInvalidRefeshToken(token) {
    await RefreshToken.update({ isValid: false }, { where: { token } });
  }

  async toGetAllProjects() {
    const projects = await Project.findAll();
    return projects;
  }

  async toGetAllProjectsOfUser() {
    const resultOfInnerJoinSelectOfRefreshTokenData = await Project.findAll({
      include: [
        {
          model: User,
          where: { login: this.login },
        },
      ],
      raw: true,
      nest: true,
    });
    return resultOfInnerJoinSelectOfRefreshTokenData;
  }

  async changeNameOfProject(oldNameOfProject, newNameOfProject) {
    await Project.update({ name: newNameOfProject }, {
      where: {
        name: oldNameOfProject,
      },
    });
  }

  async removeProject(nameOfProject) {
    await Project.destroy({
      where: {
        name: nameOfProject,
      },
    });
  }

  async createProject({ name, description }) {
    const user = await User.findOne({ where: { login: this.login } });
    console.log(user.dataValues.id);
    await Project.create({
      name,
      description,
      ownerId: user.dataValues.id,
      rating: 0,
      balance: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
}

module.exports = Person;

const UserModel = require("../models/UserModel");

const ListUsers = async (request, response) => {
  try {
    const users = await UserModel.findAll();
    response.status(200);
    response.json(users);
  } catch (error) {
    console.log(error.message);
    response.status(500);
    response.json({ message: "Erro ao listar usuários " + error.message });
  }
};

const UserById = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (user) {
      response.status(200).json(user);
    } else {
      response.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error(error.message);
    response
      .status(500)
      .json({ message: "Erro ao buscar usuário: " + error.message });
  }
};

const CreateUser = async (request, response) => {
  try {
    await UserModel.create(request.body);
    response.status(201);
    response.json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.log(error.message);
    response.status(400);
    response.json({ message: "Erro ao criar usuário " + error.message });
  }
};

const UpdateUser = async (request, response) => {
  try {
    const { id } = request.params;
    const [updated] = await UserModel.update(request.body, { where: { id } });

    if (updated) {
      const updatedUser = await UserModel.findByPk(id);
      response.status(200).json({
        message: "Usuário atualizado com sucesso",
        updatedUser,
        rowsUpdated: updated,
      });
    } else {
      response.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error(error.message);
    response
      .status(500)
      .json({ message: "Erro ao atualizar usuário: " + error.message });
  }
};

const DeleteUser = async (request, response) => {
  try {
    const { id } = request.params;
    const deleted = await UserModel.destroy({ where: { id } });

    if (deleted) {
      response.status(200);
      response.json({ message: "Usuário deletado com sucesso" });
    } else {
      response.status(404);
      response.json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500);
    response.json({ message: "Erro ao deletar usuário " + error.message });
  }
};

module.exports = {
  ListUsers,
  UserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
};

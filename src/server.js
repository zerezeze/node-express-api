const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

const {
  ListUsers,
  UserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
} = require("./controllers/UserController");

// Rota principal
app.get("/", (request, response) => {
  response.end("api backend do blog");
});

app.get("/users", ListUsers);
app.get("/users/:id", UserById);
app.post("/users", CreateUser);
app.put("/users/:id", UpdateUser);
app.delete("/users/:id", DeleteUser);

// Rota dinâmica para posts
app.get("/post/:slug", (request, response) => {
  let slug = request.params.slug;
  response.json({
    title: slug,
  });
});

// Rota de contato que carrega um arquivo HTML
app.get("/contato", (request, response) => {
  let content = fs.readFileSync(__dirname + "/view/contato.html");
  response.end(content);
});

// Servidor escutando na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

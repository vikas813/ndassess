const { sequelize } = require("../db/index");
const md5 = require("md5");
const { generateJWT, sanitizeUser } = require("../utility");
const passport = require("passport");

function Init(app) {
  app.post("/auth/login", async function (request, response) {
    const { email, password } = request.body;
    const user = await sequelize.models.users.findOne({ where: { email } });

    if (!user || user.password !== md5(password)) {
      response
        .status(401)
        .send({ message: "Either username or password is incorrect" });
    }

    const jwt = generateJWT(sanitizeUser(user));

    response.status(200).send({ token: jwt, user: sanitizeUser(user) });
  });

  app.get(
    "/auth/me",
    passport.authenticate("jwt", { session: false }),
    async function (request, response) {
      response.send({ user: request.user });
    }
  );
}

module.exports = {
  Init,
};
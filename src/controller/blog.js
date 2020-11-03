const { sequelize } = require("../db/index");
const passport = require('passport');

function Init(app) {
  app.get("/blog", async function (request, response) {
    const blogs = await sequelize.models.blogs.findAll({});
    response.status(200).send(blogs);
  });

  app.get("/blog/:id", async function (request, response) {
    const { id } = request.params;
    const blogs = await sequelize.models.blogs.findOne({ id });
    response.send({ blogs });
  });

  app.delete("/blog/:id", async function (request, response) {
    const { id } = request.params;
    const blogs = await sequelize.models.blogs.findOne({ where:{id} });
    const dest = await blogs.destroy();
    response.send({ dest });
  });

  app.post(
    "/blog",
    passport.authenticate("jwt", { session: false }),
    async function (request, response) {
      const { body } = request;
      const { writer, content, description } = body;

      const createdblogs = await sequelize.models.blogs.create({
        writer ,
        content,
        description,
      });
      response.status(201).send(createdblogs);
    }
  );

  app.put("/blog/:id", async function (request, response) {
    const { id } = request.params;
    const blogs = await sequelize.models.blogs.findOne({where:{id} });

    const { body } = request;
    const {writer, content, description } = body;

    blog.blog_writer = writer ? writer : blog.writer;
    blog.content = content ? content : blog.content;
    blog.description = description ? description : blog.description;
    await blog.save();

    response.status(200).send(blog);
  });
}

module.exports = {
  Init,
};
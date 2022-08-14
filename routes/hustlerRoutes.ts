import * as hustlers from "./../controllers/hustlers";

const hustlerRoutes = async (fastify: any, options: any) => {
  fastify.get("/", hustlers.getAllHustlers);

  fastify.post("/skill/:skill", hustlers.getSortHustlers);

  fastify.get("/:userId", hustlers.getHustler);

  fastify.post("/:userId", hustlers.createHustler);

  fastify.patch("/:userId", hustlers.updateHustler);

  fastify.delete("/:userId", hustlers.deleteHustler);
};

export default hustlerRoutes;

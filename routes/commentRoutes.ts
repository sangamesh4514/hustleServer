import * as comments from "./../controllers/comments";

const commentRoutes = async (fastify: any, options: any) => {
  fastify.get("/all/:hustlerId", comments.getAllComments);

  fastify.get("/:commentId", comments.getcomment);

  fastify.post("/:hustlerId", comments.createComment);

  fastify.patch("/like/:commentId", comments.toggleCommentLikes);

  fastify.patch("/:commentId", comments.editComment);

  fastify.delete("/:commentId", comments.deleteComment);
};

export default commentRoutes;

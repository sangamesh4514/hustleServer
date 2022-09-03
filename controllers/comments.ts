import hustlers from "../models/hustlers";
import comments from "../models/comments";
import { v4 as uuidv4 } from "uuid";

export const getAllComments = async (req: any, res: any) => {
  const { hustlerId } = req.params;
  try {
    const commentsData = await comments
      .find({ hustlerId })
      .sort({ contentDate: -1 });
    return commentsData;
  } catch (error) {
    throw error;
  }
};
export const getcomment = async (req: any, res: any) => {
  const { commentId } = req.params;
  try {
    const comment = await comments.find({ commentId });
    if (comment == null) {
      throw "comment not found!!";
    } else {
      return comment;
    }
  } catch (error) {
    throw error;
  }
};
export const createComment = async (req: any, res: any) => {
  try {
    const { hustlerId } = req.params;
    const comment = { ...req.body, hustlerId, commentId: uuidv4() };
    const newComment = new comments(comment);
    await newComment.save();
    await updateRating(hustlerId);
    res.status(201);
    return newComment;
  } catch (error) {
    throw error;
  }
};
export const editComment = async (req: any, res: any) => {
  const { commentId } = req.params;
  try {
    const updatedComment = { ...req.body };
    const comment = await comments.findOneAndUpdate(
      { commentId },
      updatedComment,
      {
        new: true,
      }
    );
    if (comment == null) {
      throw "No such comment!";
    } else {
      await updateRating(comment.hustlerId);
      return comment;
    }
  } catch (error) {
    throw error;
  }
};

export const toggleCommentLikes = async (req: any, res: any) => {
  // do like un like
  const { commentId } = req.params;
  const { userId } = req.body;
  //console.log("insdie like comment");
  try {
    const [post]: any = await comments.find({ commentId });

    let index = -1;

    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i] === userId) {
        index = i;
      }
    }

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes = post.likes.filter((id: string) => id !== userId);
    }
    const comment = await comments.findOneAndUpdate({ commentId }, post, {
      new: true,
    });
    if (comment == null) {
      throw "No such comment!";
    } else {
      return comment;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (req: any, res: any) => {
  const { commentId } = req.params;
  try {
    const deletedComment = await comments.findOneAndDelete({ commentId });
    if (deletedComment == null) {
      throw "No such comment to delete!";
    } else {
      await updateRating(deletedComment.hustlerId);
      return deletedComment;
    }
  } catch (error) {
    throw error;
  }
};

const updateRating = async (hustlerId: string) => {
  const ratings = [1, 2, 3, 4, 5];
  const ratingCount = [];
  for (let rating of ratings) {
    const number = await comments.find({ hustlerId, rating }).count();
    ratingCount.push(number || 0);
  }
  let numerator = 0;
  console.log(ratingCount);
  for (let i = 0; i < 5; i++) {
    numerator += ratings[i] * ratingCount[i];
  }
  let count = ratingCount.reduce((a, b) => a + b, 0);
  const rating = numerator / count;
  console.log(rating);
  await hustlers.findOneAndUpdate(
    { userId: hustlerId },
    { ratingValue: rating, ratingsCount: count },
    {
      new: true,
    }
  );
  return;
};

import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  commentId: {
    type: String,
    unique: true,
    required: true,
  },
  hustlerId: {
    type: String,

    required: true,
  },
  authorId: {
    type: String,

    required: true,
  },
  rating: {
    type: Number,
    default: null,
    required: true,
  },
  authorPhoneNumber: {
    type: Number,

    required: true,
  },
  authorName: {
    type: String,
    default: "",
  },
  authorImage: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  contentDate: {
    type: Date,
    default: new Date(),
  },
  reply: {
    type: String,
    default: null,
  },
  replyDate: {
    type: Date,
    default: null,
  },
  images: {
    type: [String],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
});

const comments = mongoose.model("comments", commentsSchema);

export default comments;

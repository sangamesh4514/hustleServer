import mongoose from "mongoose";

const hustlersSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,
    default: new Date().toDateString(),
  },
  gender: {
    type: String,
    default: "male",
  },
  image: {
    type: String,
    default: "",
  },
  type: {
    type: Number,
    default: 1,
  },
  saved: {
    type: [String],
    default: [],
  },
  coins: {
    type: Number,
    default: 10,
  },
  city: {
    type: String,
    default: "bangalore",
  },
  pinCode: {
    type: Number,
    default: "560093",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
    },
    name: {
      type: String,
    },
  },
  skill: {
    type: String,
    default: "volunteer",
  },
  skillId: {
    type: Number,
    default: 0,
  },
  status: {
    type: Number,
    default: 1,
  },
  stories: {
    type: [String],
    default: [],
  },
  languages: {
    type: [String],
    default: [],
  },
  SIC: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "Hard worker!",
  },
  ratings: {
    type: {},
    default: {
      value: 0,
      number: 0,
      10: [],
      9: [],
      8: [],
      7: [],
      6: [],
      5: [],
      4: [],
      3: [],
      2: [],
      1: [],
    },
  },
  comments: {
    type: [],
    default: [
      // {
      //   rating: 0,
      //   name: "",
      //   userId: "",
      //   comment: "",
      //   date: new Date(),
      // },
    ],
  },
  verified: {
    type: Number,
    default: 0,
  },
});

const hustlers = mongoose.model("hustlers", hustlersSchema);

export default hustlers;

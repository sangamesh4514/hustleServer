import hustlers from "../models/hustlers";
import users from "./../models/users";

export const getAllHustlers = async (req: any, res: any) => {
  try {
    const hustlersData = hustlers.find({});
    return hustlersData;
  } catch (error) {
    return error;
  }
};
export const getSortHustlers = async (req: any, res: any) => {
  const { skill, city } = req.params;
  console.log(skill, city);
  try {
    if (skill) {
      if (city) {
        const hustlersData = hustlers.find({ skillCode: skill, city });
        return hustlersData;
      } else {
        const hustlersData = hustlers.find({ skillCode: skill });
        return hustlersData;
      }
    }
  } catch (error) {
    return error;
  }
};
export const getHustler = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const hustler = await hustlers.findOne({ userId });
    if (hustler == null) {
      throw "User not found!!";
    } else {
      return hustler;
    }
  } catch (error) {
    return error;
  }
};

export const createHustler = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const user: any = await users.findOne({ userId });
    if (user == null) {
      throw "No such user to register as Hustler!";
    } else {
      const hustler = {
        ...user._doc,
        ...req.body,
        userId: userId,
        type: 1,
      };
      const newHustler = new hustlers(hustler);
      await newHustler.save();
      await users.findOneAndDelete({ userId });
      res.status(200).send("Hustler registered successfully!");
    }
  } catch (error) {
    throw error;
  }
};

export const updateHustler = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const updatedHustler = { ...req.body };
    const hustler = await hustlers.findOneAndUpdate(
      { userId },
      updatedHustler,
      {
        new: true,
      }
    );
    if (hustler == null) {
      throw "No such hustler!";
    } else {
      return hustler;
    }
  } catch (error) {
    return error;
  }
};

export const deleteHustler = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const deletedHustler = hustlers.findOneAndDelete({ userId });
    if (deletedHustler == null) {
      throw "No such hustler to delete!";
    } else {
      return deletedHustler;
    }
  } catch (error) {
    return error;
  }
};

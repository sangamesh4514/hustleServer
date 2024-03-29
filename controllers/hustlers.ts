import hustlers from "../models/hustlers";
import users from "./../models/users";

export const getAllHustlers = async (req: any, res: any) => {
  try {
    const hustlersData = await hustlers.find({});
    return hustlersData;
  } catch (error) {
    throw error;
  }
};
export const getSortHustlers = async (req: any, res: any) => {
  try {
    const { skill } = req.params;
    const { coordinates, name, range } = req.body;
    const radius = range / 6378.1;
    //console.log(skill, coordinates, range);
    const hustlersData = await hustlers.find({
      skill: skill,
      status: 1,
      location: {
        $geoWithin: {
          $centerSphere: [[coordinates[0], coordinates[1]], radius],
        },
      },
    });
    return hustlersData;
  } catch (error) {
    throw error;
  }
};
export const getHustler = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const hustler = await hustlers.findOne({ userId });
    if (hustler == null) {
      throw { message: "No hustler found", subCode: 404 };
    } else {
      return hustler;
    }
  } catch (error) {
    throw error;
  }
};

export const createHustler = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const user: any = await users.findOne({ userId });
    if (user == null) {
      res.status(404).send("No such user to register as a hustler!");
    } else {
      const { userName } = req.body;
      const oldHustler: any = await hustlers.findOne({ userName });
      if (oldHustler == null) {
        const hustler = {
          ...user._doc,
          ...req.body,
          userId: userId,
          type: 1,
        };
        const newHustler = new hustlers(hustler);
        await newHustler.save();
        await users.findOneAndDelete({ userId });
        res.status(200).send(newHustler);
      } else {
        throw { message: "UserName already Exists!", subCode: 203 };
      }
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
    throw error;
  }
};

export const deleteHustler = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const deletedHustler = await hustlers.findOneAndDelete({ userId });
    if (deletedHustler == null) {
      throw "No such hustler to delete!";
    } else {
      return deletedHustler;
    }
  } catch (error) {
    throw error;
  }
};

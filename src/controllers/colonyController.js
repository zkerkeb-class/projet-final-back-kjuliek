import jwt from "jsonwebtoken";

import User from "../schema/user.js";

export const addColony = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const colony = req.body
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    user.colonies.push({
      colonyName: colony.colonyName,
      speciesName: colony.speciesName,
      individualCount: colony.individualCount,
      lastFeeding: colony.lastFeeding,
      lastHumidity: colony.lastHumidity
    });
    await user.save();

    res.status(201).json({ message: "Colony added successfully", colonies: user.colonies });
  } catch (err) {
    res.status(500).json({ message: "Error adding colony", error: err.message });
  }
};

export const getAllColony = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).json(user.colonies);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving colonies", error: err.message });
  }
};

export const getByIdColony = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const colonyId = req.params.colonyId;
    const colony = user.colonies[colonyId];
    if (!colony) return res.status(404).json({ message: "Colony not found" });

    res.status(200).json(colony);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving colonies", error: err.message });
  }
};

export const updateColony = async (req, res) => {
   try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const colonyId = req.params.colonyId;
    const colony = user.colonies[colonyId];

    if (!colony) return res.status(404).json({ message: "Colony not found" });

    Object.assign(colony, req.body);
    await user.save();

    res.status(200).json({ message: "Colony updated", colony });
  } catch (err) {
    res.status(500).json({ message: "Error updating colony", error: err.message });
  }
};

export const deleteColony = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const colonyId = req.params.colonyId;
    const colony = user.colonies[colonyId];

    if (!colony) return res.status(404).json({ message: "Colony not found" });

    
    user.colonies.pull(colony.id);
    await user.save();

    res.status(200).json({ message: "Colony deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting colony", error: err.message });
  }
};
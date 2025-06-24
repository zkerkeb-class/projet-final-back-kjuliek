import jwt from "jsonwebtoken";

import User from "../schema/user.js";

// GET /api/me
export const getCurrentUser = async (req, res) => {
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
    res.status(200).send({ user: user });
  } catch (error) {
    console.error("JWT decode error:", error);
    res.status(401).send({ message: "Unauthorized" });
  }
};

// PUT /api/me
export const updateCurrentUser = async (req, res) => {
  const { username, mail, password, colonies } = req.body;
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
    const updated = await User.findByIdAndUpdate(decoded.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE /api/me
export const deleteCurrentUser = async (req, res) => {
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
    await User.findByIdAndDelete(user.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed" });
  }
};

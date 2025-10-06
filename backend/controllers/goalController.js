import Goal from "../models/Goal.js";

export const createGoal = async (req, res) => {
  try {
    const goal = new Goal({ ...req.body, user: req.user.id });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    await Goal.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Meta apagada" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

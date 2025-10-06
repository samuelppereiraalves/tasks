import Habit from "../models/Habit.js";

export const createHabit = async (req, res) => {
  try {
    const habit = new Habit({ ...req.body, user: req.user.id });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    await Habit.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Hábito apagado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

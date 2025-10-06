import Finance from "../models/Finance.js";

export const createFinance = async (req, res) => {
  try {
    const finance = new Finance({ ...req.body, user: req.user.id });
    await finance.save();
    res.status(201).json(finance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getFinances = async (req, res) => {
  try {
    const finances = await Finance.find({ user: req.user.id });
    res.json(finances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFinance = async (req, res) => {
  try {
    const finance = await Finance.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(finance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteFinance = async (req, res) => {
  try {
    await Finance.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Registro financeiro apagado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registrar utilizador
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se o email já existe
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: "Email já registado" });

    // Cria o utilizador
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", error: err.message });
  }
};

// Login do utilizador
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password )

    // Verifica se o utilizador existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email não encontrado" });

  const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).json({ error: "Senha incorreta" });

    // Gera JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", error: err.message });
  }
};

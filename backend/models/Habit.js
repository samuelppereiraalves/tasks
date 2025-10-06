import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
  progress: { type: Number, default: 0 }, // % de cumprimento
  goal: { type: Number, default: 1 }, // nº de vezes esperado
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Habit', HabitSchema);

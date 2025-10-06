import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  steps: [{ type: String }], // checklist de passos
  progress: { type: Number, default: 0 }, // % concluído
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Goal', GoalSchema);

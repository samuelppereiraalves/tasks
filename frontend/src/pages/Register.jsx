import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const submitRegister = async () => {
        setLoading(true);
        setError("");

        // Validações simples no frontend
        if (!name || !email || !password) {
            setError("Todos os campos são obrigatórios");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
            name,
            email,
            password
            });

            navigate("/login"); // se sucesso, redireciona
        } catch (err) {
            setError(err.response?.data?.error || "Registro falhou");
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center text-gray-700">Register</h1>
        
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-medium">Name</label>
            <input 
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                type="text" 
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium">Email</label>
          <input 
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
            type="email" 
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium">Password</label>
          <input 
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
            type="password" 
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={submitRegister} disabled={loading} className="bg-black text-white p-3 rounded-lg font-semibold cursor-pointer transition-colors">
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-gray-500 text-sm" onClick={() => navigate("/login")}>
          Alredy have an account? <span className="text-black hover:underline cursor-pointer">Log in</span>
        </p>
      </div>
    </div>
  );
}

export default Register;

import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/auth";
import bgImage from "/image/home-bg1.png";
import { login } from "../service/auth";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/login")({
  component: Login, 
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate({ to: "/admin" });
    }
  }, [navigate, token]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const body = {
      email,
      password,
    };

    const result = await login(body);
    if (result.success) {
      dispatch(setToken(result.data.token));

      navigate({ to: "/" });
      return;
    }

    toast.error(result?.message);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Halo admin
        </h2>
        <p className="text-gray-600 text-center mb-6">Welcome to SIPRESMARU</p>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="masukkan email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="masukkan password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

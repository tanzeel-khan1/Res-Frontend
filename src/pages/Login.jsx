import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const role = await login(email, password);

      toast.success("Login successful");

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "waiter") {
        navigate("/waiter");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#181C14] flex items-center justify-center px-4">

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />

        <div
          className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-bounce"
          style={{ animationDuration: "8s" }}
        />

        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"
          style={{
            transform: "translate(-50%, -50%)",
            animation: "pulse 6s infinite",
          }}
        />
      </div>

      {/* Login Card */}
      <div className="relative z-20 w-full max-w-md">

        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-3xl blur opacity-30"></div>

        <div className="relative bg-black/30 backdrop-blur-xl border border-amber-400/20 rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.15)] p-6 sm:p-8">

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-3xl shadow-lg">
              🔑
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>

          <p className="text-center text-gray-300 mt-2 mb-8">
            Login to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-amber-200 mb-2 text-sm">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-white/5
                  border
                  border-amber-400/20
                  text-white
                  placeholder:text-gray-400
                  focus:outline-none
                  focus:border-amber-400
                  transition
                "
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-amber-200 mb-2 text-sm">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    bg-white/5
                    border
                    border-amber-400/20
                    text-white
                    placeholder:text-gray-400
                    focus:outline-none
                    focus:border-amber-400
                    transition
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-300"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            

            {/* Login Button */}
            <button
              type="submit"
              className="
                w-full
                py-3
                rounded-xl
                font-semibold
                text-black
                bg-gradient-to-r
                from-amber-300
                via-yellow-400
                to-amber-500
                hover:scale-[1.02]
                transition
                duration-300
                cursor-pointer
              "
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-gray-300 mt-6">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-amber-400 cursor-pointer hover:text-amber-300"
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
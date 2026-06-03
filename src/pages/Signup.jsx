import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegister } from "../hooks/useAuth"; 
import SignupBackground from "../components/SignupBackground";
export default function SignupPage() {
  const navigate = useNavigate();

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // ✅ Register Hook
  const { mutate: registerUser, isLoading } = useRegister();

  // ✅ Submit Handler
  const onSubmit = (formData) => {
    // ✅ Auto role client
    const payload = { ...formData, role: "cleint" };

    registerUser(payload, {
      onSuccess: (data) => {
        toast.success(data.message || "OTP sent to email");

        // ✅ OTP page par redirect
        navigate("/verify-otp", {
          state: { email: formData.email, role: "cleint" },
        });
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Signup failed!"
        );
      },
    });
  };

  return (
  <div className="min-h-screen relative bg-[#181C14] flex items-center justify-center p-4 overflow-hidden">

    {/* Three.js Background */}
    <div className="absolute inset-0">
      <SignupBackground />
    </div>

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/50" />

    {/* Signup Card */}
    <div className="relative z-20 w-full max-w-md">

      {/* Glow Border */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-3xl blur opacity-25"></div>

      <div className="relative bg-black/30 backdrop-blur-xl border border-amber-400/20 rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.15)] p-8">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-3xl shadow-lg">
            🍽️
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          FineTaste
        </h1>

        <p className="text-center text-amber-100 mt-2 mb-8">
          Create your account
        </p>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name */}
          <div>
            <label className="block text-amber-200 mb-2 text-sm">
              Full Name
            </label>

            <input
              {...register("name", {
                required: "Name is required",
              })}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-amber-400/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-amber-400 transition"
            />

            {errors.name && (
              <p className="text-red-400 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-amber-200 mb-2 text-sm">
              Email Address
            </label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email",
                },
              })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-amber-400/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-amber-400 transition"
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-amber-200 mb-2 text-sm">
              Password
            </label>

            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "At least 6 characters",
                },
              })}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-amber-400/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-amber-400 transition"
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 hover:scale-[1.02] transition duration-300 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Signing up..." : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-amber-400 cursor-pointer hover:text-amber-300"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  </div>
);
}

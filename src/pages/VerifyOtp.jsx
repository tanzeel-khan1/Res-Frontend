import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOtp } from "../hooks/useAuth";
import { useState } from "react";
import SignupBackground from "../components/SignupBackground";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const { mutate: verifyOtp, isLoading } = useVerifyOtp();

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyOtp(
      { email, otp },
      {
        onSuccess: () => {
          alert("Verified! Now you can login");
          navigate("/login");
        },
        onError: (err) => {
          alert(err.response?.data?.message || "OTP verification failed");
        },
      },
    );
  };

  return (
  <div className="min-h-screen relative bg-[#181C14] flex items-center justify-center p-4 overflow-hidden">

    {/* Background */}
    <div className="absolute inset-0">
      <SignupBackground />
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/60" />

    {/* Card */}
    <div className="relative z-20 w-full max-w-md">

      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-3xl blur opacity-25"></div>

      <div className="relative bg-black/30 backdrop-blur-xl border border-amber-400/20 rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.15)] p-8">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-3xl shadow-lg">
            🔐
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          Verify OTP
        </h1>

        <p className="text-center text-gray-300 mt-3 mb-2">
          We've sent a verification code to
        </p>

        <p className="text-center text-amber-300 text-sm break-all mb-8">
          {email}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-amber-200 mb-2 text-sm">
              Enter OTP
            </label>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              placeholder="● ● ● ● ● ●"
              className="
                w-full
                text-center
                tracking-[12px]
                text-2xl
                font-bold
                px-4
                py-4
                rounded-xl
                bg-white/5
                border
                border-amber-400/20
                text-white
                placeholder:text-gray-500
                focus:outline-none
                focus:border-amber-400
                transition
              "
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
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
              disabled:opacity-50
            "
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Footer */}
      

      </div>
    </div>
  </div>
);
}

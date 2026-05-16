import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2, Mail, Lock, Briefcase, User, Building2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      if (response.data.success) {
        dispatch(setUser(response.data.user))
        navigate("/")
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) navigate("/")
  })

  return (
    <div className="page-dark min-h-screen flex flex-col transition-colors duration-300">
      <div className="grid-overlay" />

      {/* Ambient blobs */}
      <div className="ambient-blob" style={{ width: '600px', height: '500px', background: 'var(--accent-glow)', top: '-100px', left: '50%', transform: 'translateX(-50%)', filter: 'blur(150px)', animationDuration: '9s' }} />
      <div className="ambient-blob ambient-blob-reverse" style={{ width: '400px', height: '400px', background: 'var(--accent-glow)', opacity: 0.5, bottom: '0', left: '0', filter: 'blur(120px)', animationDuration: '11s' }} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            {/* Card */}
            <div
              className="rounded-2xl p-8 fade-up glass-card"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center glass-accent-panel">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-2xl font-semibold gradient-text tracking-tight mb-2">Welcome back</h1>
                <p className="text-sm text-(--fg-muted)">Sign in to your JobPortal account</p>
              </div>

              <form onSubmit={submitHandler} className="space-y-5">
                {/* Email */}
                <div>
                  <Label className="text-xs font-medium text-(--fg-muted) uppercase tracking-wider mb-2 block">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--fg-muted)" />
                    <input
                      type="email"
                      name="email"
                      value={input.email}
                      onChange={changeEventHandler}
                      placeholder="you@example.com"
                      className="input-dark w-full pl-10 pr-4 py-3 text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <Label className="text-xs font-medium text-(--fg-muted) uppercase tracking-wider mb-2 block">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--fg-muted)" />
                    <input
                      type="password"
                      name="password"
                      value={input.password}
                      onChange={changeEventHandler}
                      placeholder="Enter your password"
                      className="input-dark w-full pl-10 pr-4 py-3 text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Role selector */}
                <div>
                  <Label className="text-xs font-medium text-(--fg-muted) uppercase tracking-wider mb-3 block">I am a</Label>
                  <RadioGroup className="flex gap-3">
                    {[
                      { value: 'student', label: 'Student', icon: User },
                      { value: 'recruiter', label: 'Recruiter', icon: Building2 },
                    ].map(({ value, label, icon: Icon }) => (
                      <label
                        key={value}
                        className="flex-1 flex items-center gap-3 cursor-pointer rounded-xl px-4 py-3 transition-all duration-200"
                        style={{
                          background: input.role === value ? 'var(--icon-bg)' : 'var(--surface)',
                          border: `1px solid ${input.role === value ? 'var(--border-accent)' : 'var(--border-default)'}`,
                        }}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={value}
                          checked={input.role === value}
                          onChange={changeEventHandler}
                          className="sr-only"
                        />
                        <Icon className="w-4 h-4" style={{ color: input.role === value ? 'var(--accent)' : 'var(--fg-muted)' }} />
                        <span className="text-sm font-medium" style={{ color: input.role === value ? 'var(--fg)' : 'var(--fg-muted)' }}>
                          {label}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Submit */}
                {loading ? (
                  <button disabled className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm opacity-80">
                    <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                  </button>
                ) : (
                  <button type="submit" className="btn-primary w-full py-3 rounded-xl text-sm font-semibold">
                    Sign In
                  </button>
                )}
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login

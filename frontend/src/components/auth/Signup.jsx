import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2, Mail, Lock, User, Phone, Briefcase, Building2, Upload } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file)

    try {
      dispatch(setLoading(true))
      const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      })
      if (response.data.success) {
        navigate("/login")
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unable to connect to server. Please make sure backend is running.")
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) navigate("/")
  })

  const fields = [
    { name: 'fullName', label: 'Full Name', placeholder: 'John Doe', type: 'text', icon: User },
    { name: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email', icon: Mail },
    { name: 'phoneNumber', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', type: 'tel', icon: Phone },
    { name: 'password', label: 'Password', placeholder: 'Create a strong password', type: 'password', icon: Lock },
  ]

  return (
    <div className="page-dark min-h-screen flex flex-col transition-colors duration-300">
      <div className="grid-overlay" />

      {/* Ambient blobs */}
      <div className="ambient-blob" style={{ width: '600px', height: '500px', background: 'var(--accent-glow)', top: '-100px', left: '50%', transform: 'translateX(-50%)', filter: 'blur(150px)', animationDuration: '9s' }} />
      <div className="ambient-blob ambient-blob-reverse" style={{ width: '400px', height: '400px', background: 'var(--accent-glow)', opacity: 0.5, bottom: '0', right: '0', filter: 'blur(120px)', animationDuration: '11s' }} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg">
            <div
              className="rounded-2xl p-8 fade-up glass-card"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center glass-accent-panel">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-2xl font-semibold gradient-text tracking-tight mb-2">Create an account</h1>
                <p className="text-sm text-(--fg-muted)">Start your journey on JobPortal today</p>
              </div>

              <form onSubmit={submitHandler} className="space-y-4">
                {/* Input fields */}
                {fields.map(({ name, label, placeholder, type, icon: Icon }) => (
                  <div key={name}>
                    <Label className="text-xs font-medium text-(--fg-muted) uppercase tracking-wider mb-2 block">{label}</Label>
                    <div className="relative">
                      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--fg-muted)" />
                      <input
                        type={type}
                        name={name}
                        value={input[name]}
                        onChange={changeEventHandler}
                        placeholder={placeholder}
                        className="input-dark w-full pl-10 pr-4 py-3 text-sm"
                      />
                    </div>
                  </div>
                ))}

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
                        <input type="radio" name="role" value={value} checked={input.role === value} onChange={changeEventHandler} className="sr-only" />
                        <Icon className="w-4 h-4" style={{ color: input.role === value ? 'var(--accent)' : 'var(--fg-muted)' }} />
                        <span className="text-sm font-medium" style={{ color: input.role === value ? 'var(--fg)' : 'var(--fg-muted)' }}>{label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Profile Photo */}
                <div>
                  <Label className="text-xs font-medium text-(--fg-muted) uppercase tracking-wider mb-2 block">Profile Photo</Label>
                  <label
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 glass-panel"
                    style={{
                      border: `1px dashed ${input.file ? 'var(--border-accent)' : 'var(--border-default)'}`,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.background = 'var(--icon-bg)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = input.file ? 'var(--border-accent)' : 'var(--border-default)'; e.currentTarget.style.background = 'var(--surface)' }}
                  >
                    <Upload className="w-4 h-4 text-(--fg-muted)" />
                    <span className="text-sm text-(--fg-muted)">
                      {input.file ? input.file.name : 'Choose profile photo (optional)'}
                    </span>
                    <input accept="image/*" onChange={changeFileHandler} type="file" className="sr-only" />
                  </label>
                </div>

                {/* Submit */}
                {loading ? (
                  <button disabled className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm opacity-80">
                    <Loader2 className="w-4 h-4 animate-spin" /> Creating account...
                  </button>
                ) : (
                  <button type="submit" className="btn-primary w-full py-3 rounded-xl text-sm font-semibold">
                    Create Account
                  </button>
                )}
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

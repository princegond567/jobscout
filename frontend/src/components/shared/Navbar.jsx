import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogOut, User2, Menu, X, Briefcase, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks =
    user && user.role === "recruiter"
      ? [
        { to: "/admin/companies", label: "Companies" },
        { to: "/admin/jobs", label: "Jobs" },
      ]
      : [
        { to: "/", label: "Home" },
        { to: "/jobs", label: "Jobs" },
        { to: "/browse", label: "Browse" },
      ];

  return (
    <>
      <nav className="navbar-glass sticky top-0 z-50 w-full transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_12px_var(--accent-glow)] group-hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">
              <span style={{ color: 'var(--fg)' }}>Job</span>
              <span className="gradient-text-primary">Scout</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ color: 'var(--fg-muted)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.background = 'var(--surface)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
              style={{ color: 'var(--fg-muted)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.background = 'var(--surface)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.background = 'transparent'; }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {!user ? (
              <>
                <Link to="/login">
                  <button className="btn-secondary px-4 py-2 text-sm rounded-lg">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="btn-primary px-4 py-2 text-sm rounded-lg">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="relative group">
                    <Avatar className="h-9 w-9 ring-2 ring-(--accent)/30 ring-offset-2 ring-offset-(--bg-base) hover:ring-(--accent)/60 transition-all duration-200 cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback className="bg-(--accent)/20 text-(--accent-bright) text-sm font-medium">
                        {user?.fullName?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-72 p-0 border-0 shadow-none bg-transparent"
                  align="end"
                >
                  <div className="rounded-2xl overflow-hidden glass-dialog">
                    {/* Profile header */}
                    <div className="p-5 border-b" style={{ borderColor: 'var(--border-default)' }}>
                      <div className="flex gap-3 items-center">
                        <Avatar className="h-11 w-11 ring-2 ring-(--accent)/30">
                          <AvatarImage src={user?.profile?.profilePhoto} />
                          <AvatarFallback className="bg-(--accent)/20 text-(--accent-bright) font-medium">
                            {user?.fullName?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-sm truncate" style={{ color: 'var(--fg)' }}>
                            {user?.fullName}
                          </h4>
                          <p className="text-xs truncate mt-0.5" style={{ color: 'var(--fg-muted)' }}>
                            {user?.profile?.bio || user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-2">
                      {user && user.role === "student" && (
                        <Link to="/profile">
                          <button
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group"
                            style={{ color: 'var(--fg-muted)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.background = 'var(--surface)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.background = 'transparent'; }}
                          >
                            <User2 className="w-4 h-4 group-hover:text-primary transition-colors" />
                            View Profile
                          </button>
                        </Link>
                      )}
                      <button
                        onClick={logoutHandler}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group"
                        style={{ color: 'var(--fg-muted)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.background = 'transparent'; }}
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors duration-200"
              style={{ color: 'var(--fg-muted)' }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="p-2 rounded-lg transition-all"
              style={{ color: 'var(--fg-muted)' }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t glass-dialog"
            style={{ borderRadius: 0, borderColor: 'var(--border-default)' }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile auth / user */}
              <div className="pt-3 border-t mt-3" style={{ borderColor: 'var(--border-default)' }}>
                {!user ? (
                  <div className="flex flex-col gap-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                      <button className="btn-secondary w-full px-4 py-2.5 text-sm rounded-lg">
                        Login
                      </button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>
                      <button className="btn-primary w-full px-4 py-2.5 text-sm rounded-lg">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <Avatar className="h-9 w-9 ring-2 ring-(--accent)/30">
                        <AvatarImage src={user?.profile?.profilePhoto} />
                        <AvatarFallback className="bg-(--accent)/20 text-(--accent-bright) text-sm">
                          {user?.fullName?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{user?.fullName}</p>
                        <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>{user?.email}</p>
                      </div>
                    </div>
                    {user.role === "student" && (
                      <Link to="/profile" onClick={() => setMobileOpen(false)}>
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all" style={{ color: 'var(--fg-muted)' }}>
                          <User2 className="w-4 h-4" /> View Profile
                        </button>
                      </Link>
                    )}
                    <button
                      onClick={() => { logoutHandler(); setMobileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all" style={{ color: 'var(--fg-muted)' }}
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Contact, Mail, Pen, FileText, Code2, ExternalLink } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth)
  const resumeUrl = user?.profile?.resume;
  const isResume = Boolean(resumeUrl);

  return (
    <div className="page-dark min-h-screen transition-colors duration-300">
      <div className="grid-overlay" />
      <div className="ambient-blob" style={{ width: '700px', height: '400px', background: 'var(--accent-glow)', top: 0, left: '30%', filter: 'blur(130px)', animationDuration: '10s' }} />

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
          {/* Profile Card */}
          <div
            className="rounded-2xl p-8 fade-up relative overflow-hidden glass-card"
          >

            {/* Header row */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <Avatar className="h-20 w-20 ring-2 ring-(--accent)/40 ring-offset-4 ring-offset-(--bg-base)">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || "https://img.freepik.com/premium-vector/minimalist-type-creative-business-logo-template_1283348-23106.jpg?semt=ais_incoming&w=740&q=80"}
                      alt="profile"
                    />
                    <AvatarFallback className="bg-(--accent)/20 text-(--accent-bright) text-2xl font-semibold">
                      {user?.fullName?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online indicator */}
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-(--bg-base)" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold gradient-text tracking-tight">{user?.fullName}</h1>
                  <p className="text-sm text-(--fg-muted) mt-1 max-w-xs">{user?.profile?.bio || 'No bio added yet'}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(true)}
                className="btn-secondary p-2.5 rounded-xl flex items-center gap-2 text-sm"
              >
                <Pen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>

            {/* Contact info */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 p-5 rounded-xl glass-panel"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 glass-accent-panel">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-(--fg-muted)">Email</p>
                  <p className="text-sm text-(--fg) truncate">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 glass-accent-panel">
                  <Contact className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-(--fg-muted)">Phone</p>
                  <p className="text-sm text-(--fg)">{user?.phoneNumber || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-(--fg) uppercase tracking-widest">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {user?.profile?.skills?.length ? (
                  user.profile.skills.map((skill, index) => (
                    <span key={index} className="badge-accent">{skill}</span>
                  ))
                ) : (
                  <span className="text-sm text-(--fg-muted)">No skills added yet</span>
                )}
              </div>
            </div>

            {/* Resume */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-(--fg) uppercase tracking-widest">Resume</h2>
              </div>
              {isResume ? (
                <a
                  target="_blank"
                  href={resumeUrl}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group text-primary hover:text-(--accent-bright) glass-panel hover:bg-(--accent)/10"
                >
                  <FileText className="w-4 h-4" />
                  {user?.profile?.resumeOriginalName || "View Resume"}
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <p className="text-sm text-(--fg-muted)">No resume uploaded yet</p>
              )}
            </div>
          </div>

          {/* Applied Jobs */}
          <div
            className="rounded-2xl p-8 fade-up fade-up-delay-1 glass-card relative overflow-hidden"
          >
            <h2 className="text-sm font-semibold text-(--fg) uppercase tracking-widest mb-6">Applied Jobs</h2>
            <AppliedJobTable />
        </div>
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

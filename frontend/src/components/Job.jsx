import React, { useRef, useState } from "react";
import { Bookmark, MapPin, Building2, Clock } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 })

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const daysAgo = daysAgoFunction(job?.createdAt);
  console.log(job?.company?.logo)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 })
  }
  const handleMouseLeave = () => setSpotlight(prev => ({ ...prev, opacity: 0 }))

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card p-6 group relative"
    >
      {/* Spotlight */}
      <div
        style={{
          position: 'absolute', inset: 0, borderRadius: '16px', pointerEvents: 'none',
          background: `radial-gradient(300px circle at ${spotlight.x}px ${spotlight.y}px, var(--accent-glow), transparent 80%)`,
          opacity: spotlight.opacity, transition: 'opacity 0.3s ease',
        }}
      />

      {/* Top row: date + bookmark */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1.5 text-xs text-(--fg-muted)">
          <Clock className="w-3.5 h-3.5" />
          <span>{daysAgo === 0 ? "Today" : `${daysAgo}d ago`}</span>
        </div>
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 glass-panel"
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--icon-bg)'
            e.currentTarget.style.borderColor = 'var(--border-accent)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--surface)'
            e.currentTarget.style.borderColor = 'var(--border-default)'
          }}
        >
          <Bookmark className="w-3.5 h-3.5 text-(--fg-muted)" />
        </button>
      </div>

      {/* Company row */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 overflow-hidden glass-panel"
        >
          <Avatar className="w-9 h-9">
            <AvatarImage src={job?.company?.logo} className="object-contain" />
            <AvatarFallback className="bg-transparent text-(--fg-muted) text-xs">
              {job?.company?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h3 className="font-semibold text-sm text-(--fg)">{job?.company?.name}</h3>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-(--fg-muted)" />
            <span className="text-xs text-(--fg-muted)">India</span>
          </div>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-4">
        <h2 className="font-semibold text-base text-(--fg) mb-2">{job?.title}</h2>
        <p className="text-sm text-(--fg-muted) leading-relaxed line-clamp-2">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span className="badge-blue">{job?.position} Pos</span>
        <span className="badge-orange">{job?.jobType}</span>
        <span className="badge-accent">{job?.salary} LPA</span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="btn-secondary flex-1 py-2 text-sm rounded-lg text-center"
        >
          Details
        </button>
        <button
          className="btn-primary flex-1 py-2 text-sm rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Job;

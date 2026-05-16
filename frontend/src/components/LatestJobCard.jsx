import React, { useRef, useState } from 'react'
import { Badge } from "./ui/badge"
import { useNavigate } from 'react-router-dom'
import { MapPin, Building2, ArrowRight } from 'lucide-react'

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate()
  const cardRef = useRef(null)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    })
  }

  const handleMouseLeave = () => {
    setSpotlight(prev => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onClick={() => navigate(`/description/${job._id}`)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card p-6 cursor-pointer group relative"
    >
      {/* Mouse-tracking spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          pointerEvents: 'none',
          background: `radial-gradient(300px circle at ${spotlight.x}px ${spotlight.y}px, var(--accent-glow), transparent 80%)`,
          opacity: spotlight.opacity,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Company + location */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 glass-accent-panel"
          >
            {job?.company?.logo ? (
              <img src={job.company.logo} alt={job.company.name} className="w-6 h-6 object-contain rounded" />
            ) : (
              <Building2 className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{job?.company?.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" style={{ color: 'var(--fg-muted)' }} />
              <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>India</span>
            </div>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all duration-200 mt-1" style={{ color: 'var(--fg-muted)' }} />
      </div>

      {/* Job title & description */}
      <div className="mb-5">
        <h2 className="font-semibold text-base mb-2 leading-snug" style={{ color: 'var(--fg)' }}>
          {job?.title}
        </h2>
        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--fg-muted)' }}>
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="badge-blue">{job?.position} Position{job?.position !== 1 ? 's' : ''}</span>
        <span className="badge-orange">{job?.jobType}</span>
        <span className="badge-accent">{job?.salary} LPA</span>
      </div>
    </div>
  )
}

export default LatestJobCard

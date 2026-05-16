import { Search, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = async () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') searchJobHandler();
  }

  return (
    <section className="relative py-24 md:py-36 px-4 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto">

        {/* Top badge */}
        <div className="fade-up inline-flex items-center gap-2 mb-8">
          <span className="badge-accent inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            No. 1 Job Hunt Platform
          </span>
        </div>

        {/* Headline */}
        <h1
          className="fade-up fade-up-delay-1 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-[-0.03em] mb-6"
        >
          <span style={{ color: 'var(--fg)' }}>Search, Apply &</span>
          <br />
          <span style={{ color: 'var(--fg)' }}>Get Your <span className="text-[#6A38C2]">Dream Jobs</span></span>
        </h1>

        {/* Sub text */}
        <p
          className="fade-up fade-up-delay-2 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: 'var(--fg-muted)' }}
        >
          Connect with top companies, discover thousands of opportunities, and take the next step in your career journey.
        </p>

        {/* Search bar */}
        <div className="fade-up fade-up-delay-3 flex w-full max-w-xl mx-auto">
          <div
            className="flex flex-1 items-center gap-3 px-4 py-1 glass-panel"
            style={{
              borderRight: 'none',
              borderRadius: '12px 0 0 12px',
            }}
          >
            <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--fg-muted)' }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Find your dream job..."
              className="flex-1 bg-transparent outline-none border-none text-sm py-3"
              style={{ color: 'var(--fg)' }}
            />
          </div>
          <button
            onClick={searchJobHandler}
            className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white px-6 py-3 text-sm font-semibold flex items-center gap-2 rounded-none rounded-r-xl transition-colors duration-200"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Stats row */}
        <div className="fade-up fade-up-delay-4 flex items-center justify-center gap-8 mt-14 flex-wrap">
          {[
            { value: '10K+', label: 'Jobs Listed' },
            { value: '5K+', label: 'Companies' },
            { value: '50K+', label: 'Candidates' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-semibold gradient-text-primary">{value}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection

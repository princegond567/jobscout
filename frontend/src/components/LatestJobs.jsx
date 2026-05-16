import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <section
      className="py-20 px-4 relative border-t"
      style={{ borderColor: 'var(--border-default)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: 'var(--fg-muted)' }}>
            Opportunities
          </span>
          <h2
            className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight"
          >
            <span className="text-[#6A38C2]">Latest &amp; Top </span>
            <span style={{ color: 'var(--fg)' }}>Job Openings</span>
          </h2>
          <p className="mt-4 text-base max-w-md mx-auto" style={{ color: 'var(--fg-muted)' }}>
            Handpicked opportunities from top companies, updated daily.
          </p>
        </div>

        {/* Grid */}
        {allJobs.length <= 0 ? (
          <div className="text-center py-16">
            <p style={{ color: 'var(--fg-muted)' }}>No jobs available right now. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allJobs.slice(0, 6).map((job, i) => (
              <div
                key={job._id}
                className="fade-up"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <LatestJobCard job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default LatestJobs

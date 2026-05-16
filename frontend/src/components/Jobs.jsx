import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import FilterCard from './FilterCard'
import { useSelector } from 'react-redux'
import { motion } from "framer-motion"

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs)

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="page-dark min-h-screen transition-colors duration-300">
      <div className="grid-overlay" />

      {/* Background blobs */}
      <div className="ambient-blob" style={{ width: '600px', height: '400px', background: 'var(--accent-glow)', top: 0, left: '30%', filter: 'blur(120px)', animationDuration: '10s' }} />

      <div className="relative z-10">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold gradient-text tracking-tight">Browse Jobs</h1>
            <p className="mt-1 text-sm text-(--fg-muted)">{filterJobs.length} job{filterJobs.length !== 1 ? 's' : ''} found</p>
          </div>

          <div className="flex gap-6">
            {/* Filter Sidebar */}
            <div className="w-64 shrink-0 hidden md:block">
              <FilterCard />
            </div>

            {/* Jobs Grid */}
            {filterJobs.length <= 0 ? (
              <div className="flex-1 flex items-center justify-center py-32">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center glass-panel">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <p className="font-medium mb-1 text-(--fg)">No jobs found</p>
                  <p className="text-sm text-(--fg-muted)">Try adjusting your filters or search query</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filterJobs.map((job, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.25, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      key={job._id}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs

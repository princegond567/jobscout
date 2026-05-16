import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import useGetAllJobs from "../hooks/useGetAllJobs"
import { Search } from 'lucide-react'

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, [])

  return (
    <div className="page-dark min-h-screen transition-colors duration-300">
      <div className="grid-overlay" />
      <div className="ambient-blob" style={{ width: '500px', height: '400px', background: 'var(--accent-glow)', top: 0, left: '40%', filter: 'blur(120px)', animationDuration: '10s' }} />

      <div className="relative z-10">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center glass-accent-panel">
                <Search className="w-4 h-4 text-primary" />
              </div>
              <h1 className="text-3xl font-semibold gradient-text tracking-tight">Search Results</h1>
            </div>
            <p className="text-sm ml-11 text-(--fg-muted)">
              <span className="font-medium text-(--fg)">{allJobs.length}</span> job{allJobs.length !== 1 ? 's' : ''} matching your search
            </p>
          </div>

          {allJobs.length === 0 ? (
            <div className="flex items-center justify-center py-32">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center glass-panel">
                  <span className="text-2xl">🔍</span>
                </div>
                <p className="font-medium mb-1 text-(--fg)">No results found</p>
                <p className="text-(--fg-muted) text-sm">Try a different search term</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {allJobs.map((job, i) => (
                <div key={job._id} className="fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                  <Job job={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Browse

import React from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '../../redux/jobSlice'
import { Plus, Search, Briefcase } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])

  return (
    <div className="page-dark min-h-screen transition-colors duration-300">
      <div className="grid-overlay" />
      <div className="ambient-blob" style={{ width: '500px', height: '350px', background: 'var(--accent-glow)', top: 0, left: '40%', filter: 'blur(120px)', animationDuration: '10s' }} />

      <div className="relative z-10">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center glass-accent-panel">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <h1 className="text-2xl font-semibold gradient-text tracking-tight">Posted Jobs</h1>
              </div>
              <p className="text-sm text-(--fg-muted) ml-11">Manage your job listings</p>
            </div>
            <button onClick={() => navigate("/admin/jobs/create")} className="btn-primary px-5 py-2.5 text-sm rounded-xl flex items-center gap-2">
              <Plus className="w-4 h-4" /> Post New Job
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--fg-muted)" />
            <input
              placeholder="Filter by name, role..."
              onChange={(e) => setInput(e.target.value)}
              className="input-dark w-full pl-10 pr-4 py-2.5 text-sm"
            />
          </div>

          {/* Table */}
          <div className="glass-card overflow-hidden p-0">
            <AdminJobsTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminJobs

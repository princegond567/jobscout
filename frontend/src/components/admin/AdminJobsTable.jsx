import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs = allAdminJobs?.filter((job) => {
      if (!searchJobByText) return true;
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText])

  if (!filterJobs?.length) {
    return (
      <div className="text-center py-16">
        <p className="text-(--fg-muted) text-sm">No jobs posted yet</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-(--border-default) bg-(--surface)/50">
            {['Company', 'Role', 'Posted Date', 'Action'].map((h, i) => (
              <th key={h} className={`px-6 py-4 text-xs font-semibold uppercase tracking-widest text-(--fg-muted) ${i === 3 ? 'text-right' : 'text-left'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterJobs?.map((job) => (
            <tr key={job._id} className="border-b border-(--border-default) hover:bg-(--surface-hover) transition-colors">
              <td className="px-6 py-4 text-(--fg-muted)">{job?.company?.name}</td>
              <td className="px-6 py-4 font-medium text-(--fg)">{job?.title}</td>
              <td className="px-6 py-4 text-(--fg-muted) font-mono text-xs">{job?.createdAt.split("T")[0]}</td>
              <td className="px-6 py-4 text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-1.5 rounded-lg text-(--fg-muted) hover:text-(--fg) hover:bg-(--surface-hover) transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-44 p-1 glass-card shadow-2xl">
                    <button
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-(--fg-muted) hover:text-(--fg) hover:bg-(--surface-hover) transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Job
                    </button>
                    <button
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-(--fg-muted) hover:text-(--fg) hover:bg-(--surface-hover) transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Applicants
                    </button>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminJobsTable

import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useSelector } from 'react-redux'

const statusStyles = {
  pending: "bg-yellow-500/12 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400",
  accepted: "bg-emerald-500/12 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
  rejected: "bg-red-500/12 border border-red-500/30 text-red-600 dark:text-red-400",
}

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);

  if (!allAppliedJobs?.length) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center glass-panel">
          <span className="text-xl">📋</span>
        </div>
        <p className="text-(--fg-muted) text-sm">You haven't applied to any jobs yet</p>
      </div>
    )
  }

  return (
    <div className="table-dark overflow-hidden rounded-xl border border-(--border-default)">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-(--border-default) bg-(--surface)/50">
            {['Date', 'Job Role', 'Company', 'Status'].map(h => (
              <th key={h} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-(--fg-muted)">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allAppliedJobs.map((appliedJob) => {
            const status = appliedJob?.status || 'pending'
            const styleClass = statusStyles[status] || statusStyles.pending
            return (
              <tr
                key={appliedJob._id}
                className="transition-colors hover:bg-(--border-default) border-b border-(--border-default) border-opacity-50"
              >
                <td className="px-5 py-4 text-(--fg-muted) text-xs font-mono">
                  {appliedJob?.createdAt?.split("T")[0]}
                </td>
                <td className="px-5 py-4 text-(--fg) font-medium">
                  {appliedJob?.job?.title}
                </td>
                <td className="px-5 py-4 text-(--fg-muted)">
                  {appliedJob?.job?.company?.name}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${styleClass}`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AppliedJobTable

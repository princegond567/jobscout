import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal, CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'

const shortlistingStatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true
      const response = await axios.patch(`${APPLICATION_API_END_POINT}/status/${id}`, { status }, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if (!applicants?.application?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-(--fg-muted) text-sm">No applicants yet</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-(--border-default) bg-(--surface)/50">
            {['Full Name', 'Email', 'Phone', 'Resume', 'Date', 'Action'].map((h, i) => (
              <th key={h} className={`px-5 py-4 text-xs font-semibold uppercase tracking-widest text-(--fg-muted) ${i === 5 ? 'text-right' : 'text-left'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applicants?.application?.map((item) => (
            <tr key={item._id} className="border-b border-(--border-default) hover:bg-(--surface-hover) transition-colors">
              <td className="px-5 py-4 font-medium text-(--fg)">{item?.applicant.fullName}</td>
              <td className="px-5 py-4 text-(--fg-muted) text-xs">{item?.applicant?.email}</td>
              <td className="px-5 py-4 text-(--fg-muted) text-xs">{item?.applicant?.phoneNumber}</td>
              <td className="px-5 py-4">
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-(--accent-bright) transition-colors"
                  >
                    {item?.applicant?.profile?.resumeOriginalName || 'View'}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs text-(--fg-muted)">NA</span>
                )}
              </td>
              <td className="px-5 py-4 text-(--fg-muted) font-mono text-xs">{item?.applicant.createdAt.split("T")[0]}</td>
              <td className="px-5 py-4 text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-1.5 rounded-lg text-(--fg-muted) hover:text-(--fg) hover:bg-(--surface-hover) transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-1 glass-card shadow-2xl">
                    {shortlistingStatus.map((status, index) => (
                      <button
                        key={index}
                        onClick={() => statusHandler(status, item._id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${status === 'Accepted'
                          ? 'text-emerald-400 hover:bg-emerald-500/5'
                          : 'text-red-400 hover:bg-red-500/5'
                          }`}
                      >
                        {status === 'Accepted'
                          ? <CheckCircle className="w-3.5 h-3.5" />
                          : <XCircle className="w-3.5 h-3.5" />
                        }
                        {status}
                      </button>
                    ))}
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

export default ApplicantsTable

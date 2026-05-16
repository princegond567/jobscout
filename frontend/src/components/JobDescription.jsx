import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant'
import { setSingleJob } from '../redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import Navbar from './shared/Navbar'
import { MapPin, DollarSign, Briefcase, Users, Calendar, CheckCircle, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const JobDescription = () => {
  const { user } = useSelector(store => store.auth)
  const { singleJob } = useSelector(store => store.job)
  const isInitiallyApplied = singleJob?.application?.some(application => application.applicant === user?._id)
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      const response = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      )
      console.log(response.data)
      if (response.data.success) {
        setIsApplied(true);
        const updatedSingleJob = { ...singleJob, application: [...singleJob.application, { applicant: user?._id }] }
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/${jobId}`, { withCredentials: true })
        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
          setIsApplied(response.data.job.application.some(application => application.applicant === user?._id))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  const details = [
    { icon: Briefcase, label: 'Role', value: singleJob?.title },
    { icon: MapPin, label: 'Location', value: singleJob?.location },
    { icon: DollarSign, label: 'Salary', value: singleJob?.salary ? `${singleJob.salary} LPA` : null },
    { icon: Briefcase, label: 'Experience', value: singleJob?.experience },
    { icon: Users, label: 'Total Applicants', value: singleJob?.application?.length },
    { icon: Calendar, label: 'Posted Date', value: singleJob?.createdAt?.split("T")[0] },
  ]

  return (
    <div className="page-dark min-h-screen transition-colors duration-300">
      <div className="grid-overlay" />
      <div className="ambient-blob" style={{ width: '600px', height: '400px', background: 'var(--accent-glow)', top: 0, left: '50%', transform: 'translateX(-50%)', filter: 'blur(140px)', animationDuration: '10s' }} />

      <div className="relative z-10">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-(--fg-muted) hover:text-(--fg) mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to jobs
          </button>

          {/* Header card */}
          <div className="glass-card p-8 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                {/* Company badge */}
                {singleJob?.company?.name && (
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div
                      className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center glass-panel"
                    >
                      {singleJob?.company?.logo ? (
                        <img src={singleJob.company.logo} alt="" className="w-6 h-6 object-contain" />
                      ) : (
                        <span className="text-xs text-(--fg-muted)">{singleJob?.company?.name?.charAt(0)}</span>
                      )}
                    </div>
                    <span className="text-sm text-(--fg-muted)">{singleJob?.company?.name}</span>
                  </div>
                )}

                <h1 className="text-3xl font-semibold gradient-text tracking-tight mb-4">
                  {singleJob?.title}
                </h1>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="badge-blue">{singleJob?.position} Position{singleJob?.position !== 1 ? 's' : ''}</span>
                  <span className="badge-orange">{singleJob?.jobType}</span>
                  <span className="badge-accent">{singleJob?.salary} LPA</span>
                </div>
              </div>

              {/* Apply button */}
              <div className="shrink-0">
                <button
                  onClick={isApplied ? null : applyJobHandler}
                  disabled={isApplied}
                  className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${isApplied
                    ? 'cursor-not-allowed opacity-60 glass-panel border border-(--border-default)'
                    : 'btn-primary'
                    }`}
                  style={isApplied ? { color: 'var(--fg-muted)' } : {}}
                >
                  {isApplied && <CheckCircle className="w-4 h-4" />}
                  {isApplied ? "Already Applied" : "Apply Now"}
                </button>
              </div>
            </div>
          </div>

          {/* Description card */}
          <div className="glass-card p-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-(--fg-muted) mb-6">
              Job Description
            </h2>

            {/* Description text */}
            {singleJob?.description && (
              <p className="text-(--fg-muted) leading-relaxed mb-8 text-sm">
                {singleJob.description}
              </p>
            )}

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {details.map(({ icon: Icon, label, value }) => value !== null && value !== undefined ? (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl glass-panel"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 glass-accent-panel"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-(--fg-muted) mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-(--fg)">{String(value)}</p>
                  </div>
                </div>
              ) : null)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDescription

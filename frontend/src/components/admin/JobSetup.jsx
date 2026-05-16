import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, Upload } from 'lucide-react'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetJobById from '../../hooks/useGetJobById'

const JobSetup = () => {
  const params = useParams();
  const jobId = params.id;
  useGetJobById(jobId)

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirement: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: ""
  });

  const { singleJob } = useSelector(store => store.job);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    
    // Construct JSON instead of FormData since job update doesn't have file upload
    const jobData = {
      title: input.title,
      description: input.description,
      requirement: input.requirement,
      salary: input.salary,
      location: input.location,
      jobType: input.jobType,
      experience: input.experience,
      position: input.position
    }

    try {
      setLoading(true)
      const response = await axios.put(`${JOB_API_END_POINT}/update/${jobId}`, jobData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirement: singleJob.requirement?.join(",") || "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        experience: singleJob.experienceLevel || singleJob.experience || "",
        position: singleJob.position || ""
      })
    }
  }, [singleJob])

  const fields = [
    { name: 'title', label: 'Job Title', placeholder: 'e.g. Senior Frontend Engineer', type: 'text' },
    { name: 'description', label: 'Description', placeholder: 'Describe the role and responsibilities', type: 'text' },
    { name: 'requirement', label: 'Requirements', placeholder: 'List key requirements...', type: 'text' },
    { name: 'salary', label: 'Salary (LPA)', placeholder: 'e.g. 12', type: 'number' },
    { name: 'location', label: 'Location', placeholder: 'e.g. Bangalore, Remote', type: 'text' },
    { name: 'jobType', label: 'Job Type', placeholder: 'e.g. Full-time, Part-time', type: 'text' },
    { name: 'experience', label: 'Experience Level', placeholder: 'e.g. 2-4 years', type: 'text' },
    { name: 'position', label: 'Number of Positions', placeholder: '1', type: 'number' },
  ]

  return (
    <div className="page-dark min-h-screen transition-colors duration-300">
      <div className="grid-overlay" />
      <div className="ambient-blob" style={{ width: '600px', height: '400px', background: 'var(--accent-glow)', top: '-50px', left: '50%', transform: 'translateX(-50%)', filter: 'blur(140px)', animationDuration: '10s' }} />

      <div className="relative z-10">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <button
            onClick={() => navigate("/admin/jobs")}
            className="flex items-center gap-2 text-sm text-(--fg-muted) hover:text-(--fg) mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Jobs
          </button>

          <div className="rounded-2xl p-8 fade-up glass-card shadow-2xl">
            <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border-default), transparent)', margin: '-32px -32px 32px' }} />

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center glass-accent-panel">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold gradient-text">Job Setup</h1>
                <p className="text-sm text-(--fg-muted)">Update your job posting</p>
              </div>
            </div>

            <form onSubmit={submitHandler}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                {fields.map(({ name, label, placeholder, type, icon: Icon }) => (
                  <div key={name}>
                    <label className="text-xs font-medium text-(--fg-muted) uppercase tracking-wider mb-2 block">{label}</label>
                    <div className="relative">
                      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--fg-muted)" />}
                      <input
                        type={type}
                        name={name}
                        value={input[name]}
                        onChange={changeEventHandler}
                        placeholder={placeholder}
                        className={`input-dark w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 text-sm`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {loading ? (
                <button disabled className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm opacity-80">
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving changes...
                </button>
              ) : (
                <button type="submit" className="btn-primary w-full py-3 rounded-xl text-sm font-semibold">
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobSetup

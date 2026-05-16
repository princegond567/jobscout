import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../utils/constant'
import { useNavigate } from 'react-router-dom'
import { Loader2, Briefcase, AlertCircle, ArrowLeft } from 'lucide-react'

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirement: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  })
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector(store => store.company)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value)
    setInput({ ...input, companyId: selectedCompany._id });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${JOB_API_END_POINT}`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/admin/jobs")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'title', label: 'Job Title', placeholder: 'e.g. Senior Frontend Engineer', type: 'text' },
    { name: 'description', label: 'Description', placeholder: 'Describe the role and responsibilities', type: 'text' },
    { name: 'requirement', label: 'Requirements', placeholder: 'List key requirements...', type: 'text' },
    { name: 'salary', label: 'Salary (LPA)', placeholder: 'e.g. 12', type: 'text' },
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
        <div className="max-w-3xl mx-auto px-4 py-12">
          <button
            onClick={() => navigate("/admin/jobs")}
            className="flex items-center gap-2 text-sm text-(--fg-muted) hover:text-(--fg) mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Jobs
          </button>

          {/* Card */}
          <div className="rounded-2xl p-8 fade-up glass-card shadow-2xl">
            <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border-default), transparent)', margin: '-32px -32px 32px' }} />

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center glass-accent-panel">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold gradient-text">Post a New Job</h1>
                <p className="text-sm text-(--fg-muted)">Fill in the details to attract the right candidates</p>
              </div>
            </div>

            <form onSubmit={submitHandler}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {fields.map(({ name, label, placeholder, type }) => (
                  <div key={name}>
                    <label className="text-xs font-medium text-(--fg-muted) uppercase tracking-wider mb-2 block">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={input[name]}
                      onChange={changeEventHandler}
                      placeholder={placeholder}
                      className="input-dark w-full px-4 py-3 text-sm"
                    />
                  </div>
                ))}

                {/* Company selector */}
                {companies.length > 0 && (
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-(--fg-muted) uppercase tracking-wider mb-2 block">
                      Company
                    </label>
                    <Select onValueChange={selectChangeHandler}>
                      <SelectTrigger
                        className="w-full py-3 text-sm"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-default)', color: 'var(--fg)', borderRadius: '8px' }}
                      >
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent style={{ background: 'var(--background)', border: '1px solid var(--border-default)' }}>
                        <SelectGroup>
                          {companies.map((company) => (
                            <SelectItem
                              key={company._id}
                              value={company?.name?.toLowerCase()}
                              className="text-(--fg) focus:bg-(--surface-hover) focus:text-(--fg)"
                            >
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* No company warning */}
              {companies.length === 0 && (
                <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.20)' }}>
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <p className="text-sm text-red-400">Please register a company before posting a job</p>
                </div>
              )}

              {loading ? (
                <button disabled className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm opacity-80">
                  <Loader2 className="w-4 h-4 animate-spin" /> Posting job...
                </button>
              ) : (
                <button type="submit" className="btn-primary w-full py-3 rounded-xl text-sm font-semibold">
                  Post Job
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostJob

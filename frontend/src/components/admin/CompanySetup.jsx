import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, Upload } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '../../hooks/useGetCompanyById'

const CompanySetup = () => {
  const params = useParams();
  const companyId = params.id;
  useGetCompanyById(companyId)

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });

  const { singleCompany } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", input.name)
    formData.append("description", input.description)
    formData.append("website", input.website)
    formData.append("location", input.location)
    if (input.file) formData.append("file", input.file)

    try {
      setLoading(true)
      const response = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null
    })
  }, [singleCompany])

  const fields = [
    { name: 'name', label: 'Company Name', placeholder: 'e.g. Acme Corp', type: 'text', icon: Building2 },
    { name: 'description', label: 'Description', placeholder: 'About your company...', type: 'text', icon: null },
    { name: 'website', label: 'Website', placeholder: 'https://...', type: 'text', icon: Globe },
    { name: 'location', label: 'Location', placeholder: 'e.g. Bangalore, India', type: 'text', icon: MapPin },
  ]

  return (
    <div className="page-dark min-h-screen transition-colors duration-300">
      <div className="grid-overlay" />
      <div className="ambient-blob" style={{ width: '600px', height: '400px', background: 'var(--accent-glow)', top: '-50px', left: '50%', transform: 'translateX(-50%)', filter: 'blur(140px)', animationDuration: '10s' }} />

      <div className="relative z-10">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <button
            onClick={() => navigate("/admin/companies")}
            className="flex items-center gap-2 text-sm text-(--fg-muted) hover:text-(--fg) mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Companies
          </button>

          <div className="rounded-2xl p-8 fade-up glass-card shadow-2xl">
            <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border-default), transparent)', margin: '-32px -32px 32px' }} />

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center glass-accent-panel">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold gradient-text">Company Setup</h1>
                <p className="text-sm text-(--fg-muted)">Update your company profile</p>
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

                {/* Logo upload */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-(--fg-muted) uppercase tracking-wider mb-2 block">Company Logo</label>
                  <label
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
                    style={{
                      background: 'var(--surface)',
                      border: `1px dashed ${input.file && input.file instanceof File ? 'var(--accent)' : 'var(--border-default)'}`,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--surface-hover)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = input.file && input.file instanceof File ? 'var(--accent)' : 'var(--border-default)'; e.currentTarget.style.background = 'var(--surface)' }}
                  >
                    <Upload className="w-4 h-4 text-(--fg-muted)" />
                    <span className="text-sm text-(--fg-muted)">
                      {input.file instanceof File ? input.file.name : 'Upload company logo (image)'}
                    </span>
                    <input type="file" accept="image/*" onChange={changeFileHandler} className="sr-only" />
                  </label>
                </div>
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

export default CompanySetup

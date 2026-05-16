import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../../redux/companySlice'
import { Building2, ArrowLeft, ArrowRight } from 'lucide-react'

const CreateCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const response = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      if (response?.data?.success) {
        dispatch(setSingleCompany(response.data.company));
        toast.success(response.data.message);
        const companyId = response?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to register company");
    }
  }

  return (
    <div className="page-dark min-h-screen transition-colors duration-300">
      <div className="grid-overlay" />
      <div className="ambient-blob" style={{ width: '600px', height: '400px', background: 'var(--accent-glow)', top: '-50px', left: '50%', transform: 'translateX(-50%)', filter: 'blur(140px)', animationDuration: '10s' }} />

      <div className="relative z-10">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Back */}
          <button
            onClick={() => navigate("/admin/companies")}
            className="flex items-center gap-2 text-sm text-(--fg-muted) hover:text-(--fg) mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Companies
          </button>

          {/* Card */}
          <div className="rounded-2xl p-8 fade-up glass-card shadow-2xl">
            <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border-default), transparent)', margin: '-32px -32px 32px' }} />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center glass-accent-panel">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold gradient-text">Register Company</h1>
                <p className="text-sm text-(--fg-muted)">You can update the name later</p>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-xs font-medium text-(--fg-muted) uppercase tracking-wider mb-2 block">
                Company Name
              </label>
              <input
                type="text"
                className="input-dark w-full px-4 py-3 text-sm"
                placeholder="e.g. Acme Corp, Google, Microsoft..."
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/admin/companies")}
                className="btn-secondary flex-1 py-3 text-sm rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={registerNewCompany}
                className="btn-primary flex-1 py-3 text-sm rounded-xl flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCompany

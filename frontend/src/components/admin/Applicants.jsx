import React from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useEffect } from 'react'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../../redux/applicationSlice'
import { Users } from 'lucide-react'

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application)

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const response = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true })
        dispatch(setAllApplicants(response.data.job));
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllApplicants()
  }, [])

  return (
    <div className="page-dark min-h-screen transition-colors duration-300">
      <div className="grid-overlay" />
      <div className="ambient-blob" style={{ width: '500px', height: '350px', background: 'var(--accent-glow)', top: 0, left: '40%', filter: 'blur(120px)', animationDuration: '10s' }} />

      <div className="relative z-10">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center glass-accent-panel">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold gradient-text tracking-tight">Applicants</h1>
              <p className="text-sm text-(--fg-muted)">{applicants?.application?.length || 0} applicant{applicants?.application?.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          <div className="glass-card overflow-hidden p-0">
            <ApplicantsTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Applicants

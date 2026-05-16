import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Loader2, User, Mail, Phone, FileText, Code2, Upload } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { setUser } from '../redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(store => store.auth)

  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map(skill => skill),
    file: user?.profile?.resume
  });

  const dispatch = useDispatch()

  const changeEventHnadler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("fullName", input.fullName)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("bio", input.bio)
    formData.append("skills", input.skills)
    if (input.file) formData.append("file", input.file)

    try {
      setLoading(true)
      const response = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      })
      if (response.data.success) {
        dispatch(setUser(response.data.user))
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
    setOpen(false)
    console.log(input);
  }

  const fields = [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your full name', icon: User },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', icon: Mail },
    { name: 'phoneNumber', label: 'Phone', type: 'tel', placeholder: '+91 XXXXX XXXXX', icon: Phone },
    { name: 'bio', label: 'Bio', type: 'text', placeholder: 'Short professional bio', icon: null },
    { name: 'skills', label: 'Skills (comma separated)', type: 'text', placeholder: 'React, Node.js, Python...', icon: Code2 },
  ]

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-lg p-0 border-0 shadow-none bg-transparent"
        onInteractOutside={() => setOpen(false)}
      >
        <div
          className="rounded-2xl overflow-hidden glass-card shadow-2xl"
        >
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-lg font-semibold gradient-text">Update Profile</DialogTitle>
              <p className="text-sm text-(--fg-muted)">Keep your profile up to date</p>
            </DialogHeader>

            <form onSubmit={submitHandler}>
              <div className="space-y-4 mb-6">
                {fields.map(({ name, label, type, placeholder, icon: Icon }) => (
                  <div key={name}>
                    <label className="text-xs font-medium text-(--fg-muted) uppercase tracking-wider mb-2 block">
                      {label}
                    </label>
                    <div className="relative">
                      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--fg-muted)" />}
                      <input
                        id={name}
                        name={name}
                        type={type}
                        value={input[name]}
                        onChange={changeEventHnadler}
                        placeholder={placeholder}
                        className={`input-dark w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 text-sm`}
                      />
                    </div>
                  </div>
                ))}

                {/* Resume upload */}
                <div>
                  <label className="text-xs font-medium text-(--fg-muted) uppercase tracking-wider mb-2 block">Resume (PDF)</label>
                  <label
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 glass-panel"
                    style={{
                      border: `1px dashed ${input.file && input.file instanceof File ? 'var(--border-accent)' : 'var(--border-default)'}`,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.background = 'var(--icon-bg)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = input.file && input.file instanceof File ? 'var(--border-accent)' : 'var(--border-default)'; e.currentTarget.style.background = 'var(--surface)' }}
                  >
                    <Upload className="w-4 h-4 text-(--fg-muted)" />
                    <span className="text-sm text-(--fg-muted)">
                      {input.file instanceof File ? input.file.name : 'Upload updated resume'}
                    </span>
                    <input id="file" name="file" type="file" accept="application/pdf" onChange={fileChangeHandler} className="sr-only" />
                  </label>
                </div>
              </div>

              <DialogFooter>
                {loading ? (
                  <button disabled className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm opacity-80">
                    <Loader2 className="w-4 h-4 animate-spin" /> Updating...
                  </button>
                ) : (
                  <button type="submit" className="btn-primary w-full py-3 rounded-xl text-sm font-semibold">
                    Save Changes
                  </button>
                )}
              </DialogFooter>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText])

  if (!filterCompany?.length) {
    return (
      <div className="text-center py-16">
        <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center glass-panel">
          <Building2 className="w-6 h-6 text-(--fg-muted)" />
        </div>
        <p className="text-(--fg-muted) text-sm">No companies registered yet</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-(--border-default) bg-(--surface)/50">
            {['Logo', 'Company Name', 'Registered Date', 'Action'].map((h, i) => (
              <th key={h} className={`px-6 py-4 text-xs font-semibold uppercase tracking-widest text-(--fg-muted) ${i === 3 ? 'text-right' : 'text-left'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterCompany?.map((company) => (
            <tr key={company._id} className="border-b border-(--border-default) hover:bg-(--surface-hover) transition-colors">
              <td className="px-6 py-4">
                <Avatar className="h-9 w-9 rounded-xl border border-(--border-default)">
                  <AvatarImage src={company?.logo} />
                  <AvatarFallback className="rounded-xl bg-(--accent)/15 text-primary text-xs font-medium">
                    {company.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </td>
              <td className="px-6 py-4 font-medium text-(--fg)">{company.name}</td>
              <td className="px-6 py-4 text-(--fg-muted) font-mono text-xs">{company.createdAt.split("T")[0]}</td>
              <td className="px-6 py-4 text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-1.5 rounded-lg text-(--fg-muted) hover:text-(--fg) hover:bg-(--surface-hover) transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-1 glass-card shadow-2xl">
                    <button
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-(--fg-muted) hover:text-(--fg) hover:bg-(--surface-hover) transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
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

export default CompaniesTable

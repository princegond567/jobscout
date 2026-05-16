import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'
import { SlidersHorizontal, X } from 'lucide-react'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banblore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  }
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value);
  }

  const clearFilter = () => {
    setSelectedValue("");
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])

  return (
    <div
      className="rounded-2xl p-5 sticky top-20 glass-panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-(--fg)">Filters</h2>
        </div>
        {selectedValue && (
          <button
            onClick={clearFilter}
            className="flex items-center gap-1 text-xs text-(--fg-muted) hover:text-primary transition-colors"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className={index > 0 ? 'mt-5' : ''}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-(--fg-muted) mb-3">
              {data.filterType}
            </h3>
            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `filter-${index}-${idx}`
                return (
                  <div key={idx} className="flex items-center gap-3 group">
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="border-(--border-default) text-primary data-[state=checked]:border-primary"
                    />
                    <Label
                      htmlFor={itemId}
                      className="text-sm text-(--fg-muted) group-hover:text-(--fg) cursor-pointer transition-colors"
                    >
                      {item}
                    </Label>
                  </div>
                )
              })}
            </div>
            {index < filterData.length - 1 && (
              <div className="mt-4 border-t border-(--border-default)" />
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard

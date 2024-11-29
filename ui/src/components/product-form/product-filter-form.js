import React, { useState, useEffect } from 'react'
import { isBefore, parseISO, isValid } from 'date-fns'

const FilterForm = ({ filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters)
  const [errors, setErrors] = useState({ search: '', startDate: '', endDate: '' })
  const [debouncedSearch, setDebouncedSearch] = useState(localFilters.search)

  const isResetDisabled = !(
    localFilters.search ||
    localFilters.startDate ||
    localFilters.endDate
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLocalFilters((prevFilters) => ({
        ...prevFilters,
        search: debouncedSearch
      }))
    }, 300)
    return () => clearTimeout(timeout)
  }, [debouncedSearch])

  useEffect(() => {
    if (validateDates()) {
      setFilters(localFilters)
    }
  }, [localFilters])

  const resetFilters = () => {
    const resetValues = {
      ...filters,
      search: '',
      startDate: '',
      endDate: '',
      page: 1
    }
    setLocalFilters(resetValues)
    setErrors({ search: '', startDate: '', endDate: '' })
    setFilters(resetValues)
  }

  const handleInputChange = (key, value) => {
    if (key === 'search') {
      setDebouncedSearch(value)
    } else {
      setLocalFilters({ ...localFilters, [key]: value })
      validateDates()
    }
  }

  const validateDates = () => {
    const newErrors = { ...errors }
    let isValidInput = true

    const start = parseISO(localFilters.startDate)
    const end = parseISO(localFilters.endDate)

    if (localFilters.startDate && !isValid(start)) {
      newErrors.startDate = 'Start date is invalid.'
      isValidInput = false
    } else {
      newErrors.startDate = ''
    }

    if (localFilters.endDate && !isValid(end)) {
      newErrors.endDate = 'End date is invalid.'
      isValidInput = false
    } else {
      newErrors.endDate = ''
    }

    if (isValid(start) && isValid(end) && isBefore(end, start)) {
      newErrors.startDate = 'Start date cannot be after end date.'
      newErrors.endDate = 'End date cannot be before start date.'
      isValidInput = false
    }

    setErrors(newErrors)
    return isValidInput
  }

  const fields = [
    { key: 'search', type: 'text', placeholder: 'Search by name' },
    { key: 'startDate', type: 'date' },
    { key: 'endDate', type: 'date' }
  ]

  return (
    <div className="filters">
      {fields.map(({ key, type, placeholder }) => (
        <div key={key}>
          <input
            type={type}
            placeholder={placeholder}
            value={localFilters[key] || ''}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
          {errors[key] && <div className="error">{errors[key]}</div>}
        </div>
      ))}
      <button onClick={resetFilters} disabled={isResetDisabled}>
        Reset Filters
      </button>
    </div>
  )
}

export default FilterForm

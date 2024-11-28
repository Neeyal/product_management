import React, { useState, useEffect } from 'react'
import { isBefore, parseISO, isValid } from 'date-fns'

const FilterForm = ({ filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters)
  const [errors, setErrors] = useState({
    search: '',
    startDate: '',
    endDate: ''
  })
  const [debouncedSearch, setDebouncedSearch] = useState(localFilters.search)

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
    if (validateInputs('startDate', localFilters.startDate) && validateInputs('endDate', localFilters.endDate)) {
      setFilters(localFilters)
    }
  }, [localFilters])

  const resetFilters = () => {
    const resetValues = {
      search: '',
      startDate: '',
      endDate: ''
    }
    setLocalFilters(resetValues)
    setErrors({ search: '', startDate: '', endDate: '' })
    setFilters(resetValues)
  }

  const handleInputChange = (key, value) => {
    if (key === 'search') {
      setDebouncedSearch(value) 
    } else {
      setLocalFilters({
        ...localFilters,
        [key]: value
      })
    }
    validateInputs(key, value)
  }

  const validateInputs = (key, value) => {
    const newErrors = { ...errors }
    let isValidInput = true

    if (key === 'startDate') {
      if (value && !isValid(parseISO(value))) {
        newErrors.startDate = 'Start date is invalid.'
        isValidInput = false
      } else {
        newErrors.startDate = ''
        if (localFilters.endDate && isBefore(parseISO(localFilters.endDate), parseISO(value))) {
          newErrors.startDate = 'Start date cannot be after end date.'
          isValidInput = false
        }
      }
    }

    if (key === 'endDate') {
      if (value && !isValid(parseISO(value))) {
        newErrors.endDate = 'End date is invalid.'
        isValidInput = false
      } else {
        newErrors.endDate = ''
        if (localFilters.startDate && isBefore(parseISO(value), parseISO(localFilters.startDate))) {
          newErrors.endDate = 'End date cannot be before start date.'
          isValidInput = false
        }
      }
    }

    setErrors(newErrors)
    return isValidInput
  }

  return (
    <div className="filters">
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={debouncedSearch}
          onChange={(e) => handleInputChange('search', e.target.value)}
        />
        {errors.search && <div className="error">{errors.search}</div>}
      </div>

      <div>
        <input
          type="date"
          value={localFilters.startDate}
          onChange={(e) => handleInputChange('startDate', e.target.value)}
        />
        {errors.startDate && <div className="error">{errors.startDate}</div>}
      </div>

      <div>
        <input
          type="date"
          value={localFilters.endDate}
          onChange={(e) => handleInputChange('endDate', e.target.value)}
        />
        {errors.endDate && <div className="error">{errors.endDate}</div>}
      </div>

      <div>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
    </div>
  )
}

export default FilterForm

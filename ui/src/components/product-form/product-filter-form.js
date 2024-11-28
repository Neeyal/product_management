import React, { useState } from 'react'

const FilterForm = ({ filters, setFilters }) => {
    const resetFilters = () => {
        setFilters({
          ...filters,
          search: '',
          startDate: '',
          endDate: ''
        })
      }
    
      const handleInputChange = (key, value) => {
        setFilters({
          ...filters,
          [key]: value
        })
      }

    return (
        <div className="filters">
      <input
        type="text"
        placeholder="Search by name"
        value={filters.search}
        onChange={(e) => handleInputChange('search', e.target.value)}
      />
      <input
        type="date"
        value={filters.startDate}
        onChange={(e) => handleInputChange('startDate', e.target.value)}
      />
      <input
        type="date"
        value={filters.endDate}
        onChange={(e) => handleInputChange('endDate', e.target.value)}
      />
      <button onClick={resetFilters}>Reset Filters</button>
    </div>
    )



}
export default FilterForm
import React from 'react'
import { useState } from 'react'

const Select = (props) => {
    const { options, onChange, ...otherProps } = props
    
    return (
        <select {...otherProps} onChange={onChange}>
            {options.map(option => <option key={option}>{option}</option>)}
        </select>
    )
}

export default Select

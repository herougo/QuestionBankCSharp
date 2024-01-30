import React, { useCallback } from 'react'
import { useState } from 'react'
import Select from './Select'
import useArray from '../../hooks/useArray'

const ListOfSelect = (props) => {
    const { options, name, onChange } = props
    const { array, push, update, remove } = useArray([{ value: null, key: 0 }])
    const [selectCounter, setSelectCounter] = useState(1)

    const addSelect = useCallback(() => {
        push({ value: null, key: selectCounter })
        setSelectCounter(selectCounter + 1)
    })

    const removeSelect = useCallback((ix) => {
        if (array.length > 1) {
            remove(ix)
            const newArray = [...array.slice(0, ix), ...array.slice(ix + 1, array.length)]
            const values = new Set(newArray.map(x => x.value))
            if (values.has(null)) {
                values.delete(null)
            }
            onChange(Array.from(values))
        }
    })

    const selectOnChange = useCallback((e, ix) => {
        const newSingleSelectData = { ...array[ix], value: e.target.value }
        update(ix, newSingleSelectData)

        const values = new Set(array.map((x, i) => i === ix ? e.target.value : x.value))
        if (values.has(null)) {
            values.delete(null)
        }
        onChange(Array.from(values))
    })

    return (
        <>
            {
                array.map((data, ix) => (
                    <div key={data.key}>
                        <Select
                            className="m-1"
                            options={options}
                            name={name + "-" + data.key}
                            onChange={e => selectOnChange(e, ix)}>
                        </Select>
                        <button type="button" className="btn btn-primary m-1" onClick={e => addSelect()}>+</button>
                        <button type="button" className="btn btn-primary m-1" onClick={e => removeSelect(ix)}>-</button>
                    </div>
                ))
            }
        </>
    )
}

export default ListOfSelect
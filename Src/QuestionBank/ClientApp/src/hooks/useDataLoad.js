import React, { useState, useCallback, useEffect } from 'react'

const useDataLoad = (asyncDataFetchFunction, firstBody=null, defaultData=null) => {
    const [data, setData] = useState(defaultData)

    const onChange = useCallback((newBody) => {
        setData(defaultData)
        asyncDataFetchFunction(newBody, (d) => setData(d))
    })

    useEffect(() => onChange(firstBody), [])

    return [data, onChange]
}

export default useDataLoad
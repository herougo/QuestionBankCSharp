﻿import { useState } from "react"

export default function useArray(defaultValue) {
    // source: https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/main/src/5-useArray/useArray.js
    const [array, setArray] = useState(defaultValue)

    function push(element) {
        setArray(a => [...a, element])
    }

    function filter(callback) {
        setArray(a => a.filter(callback))
    }

    function update(index, newElement) {
        setArray(a => [
            ...a.slice(0, index),
            newElement,
            ...a.slice(index + 1, a.length),
        ])
    }

    function remove(index) {
        setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length)])
    }

    function clear() {
        setArray([])
    }

    return { array, set: setArray, push, filter, update, remove, clear }
}
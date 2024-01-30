import React, { useCallback, useState } from 'react'
import CreateQuestion from './CreateQuestion'
import Select from '../../reusable/Select'
import CreateTag from './CreateTag'
import CreateCourse from './CreateCourse'

const DataTypes = {
    Question: "Question",
    Tag: "Tag",
    Course: "Course"
}

const Create = () => {
    const options = [DataTypes.Question, DataTypes.Tag, DataTypes.Course]
    const [selectedOption, setSelectedOption] = useState(options[0])

    const onDropdownChange = useCallback((e) => {
        setSelectedOption(e.target.value)
    })

    let form = null
    if (selectedOption === DataTypes.Question) {
        form = <CreateQuestion />
    } else if (selectedOption === DataTypes.Tag) {
        form = <CreateTag />
    } else if (selectedOption === DataTypes.Course) {
        form = <CreateCourse />
    } else {
        throw new Error("Invalid selectedOption: " + selectedOption)
    }

    return (
        <>
            <h1>Create</h1>
            <div>Type of Data: </div>
            <Select name="data-type" options={options} onChange={onDropdownChange} />
            <hr />
            {form}
        </>
    )
}

export default Create

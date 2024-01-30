import React, { useState } from 'react'
import { createQuestion, getTagsAndCourses } from '../../../utils/apiInteraction'
import ListOfSelect from '../../reusable/ListOfSelect';
import useDataLoad from '../../../hooks/useDataLoad';

const CreateQuestion = () => {
    const [inputs, setInputs] = useState({})
    const [optionData, optionDataOnChange] = useDataLoad(
        getTagsAndCourses,
        null,
        { tags: {}, courses: {} }
    )


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const coursesOnChange = (arr) => {
        const newCourses = []
        for (const element of arr) {
            newCourses.push(optionData.courses[element])
        }
        setInputs(values => ({ ...values, courses: newCourses }))
    }

    const tagsOnChange = (arr) => {
        const newTags = []
        for (const element of arr) {
            newTags.push(optionData.tags[element])
        }
        setInputs(values => ({ ...values, tags: newTags }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createQuestion(inputs, (status, responseData) => {
            if (status === 200) {
                alert("Create question succeeded!")
            } else {
                alert("Create question failed! Status code = " + status)
            }
        })
    }

    if (optionData.tags.length === 1) {
        return (
            <div class="row">
                <div class="col">
                    Loading...
                </div>
            </div>
        )
    }
    const courseCodes = Object.keys(optionData.courses)
    const tagNames = Object.keys(optionData.tags)

    return (
        <div class="row">
            <div class="col-md-4">
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label class="control-label">Question Text</label>
                        <textarea name="question" class="form-control" onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Answer Text</label>
                        <textarea name="answer" class="form-control" onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Courses</label>
                        <ListOfSelect options={[null, ...courseCodes]} onChange={coursesOnChange} name="courses"></ListOfSelect>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Tags</label>
                        <ListOfSelect options={[null, ...tagNames]} onChange={tagsOnChange} name="tags"></ListOfSelect>
                    </div>
                    <div class="form-group">
                        <input type="submit" value="Create" class="btn btn-primary mt-2" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateQuestion

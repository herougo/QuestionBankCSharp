import React, { useState } from 'react';
import QuestionsTable from './QuestionsTable';
import { getTagsAndCourses } from '../../../utils/apiInteraction'
import useDataLoad from '../../../hooks/useDataLoad';
import QuestionDisplay from './QuestionDisplay';
import TagFilterSelector from '../../reusable/TagFilterSelector';

const QuestionFilter = (props) => {
    const { onFilterButtonClick } = props
    const [tagsAndCourses, tagsAndCoursesOnChange] = useDataLoad(
        getTagsAndCourses,
        null,
        { courses: {}, tags: {} }
    )
    const [filterBody, setFilterBody] = useState({tags: [], courses: []})

    const onCoursesFilterListChange = (courses) => {
        const courseIds = courses.map(course => tagsAndCourses.courses[course])
        setFilterBody({ ...filterBody, courses: courseIds })
    }
    const onTagsFilterListChange = (tags) => {
        const tagIds = tags.map(tag => tagsAndCourses.tags[tag])
        setFilterBody({ ...filterBody, tags: tagIds })
    }
    
    return (
        <div className="border border-primary my-2 p-2 d-inline-block bg-info">
            <h3>Filter</h3>
            <TagFilterSelector
                options={Object.keys(tagsAndCourses.courses)}
                selectName="FilterCourseDropdown"
                labelText="By Course:"
                onFilterListChange={ onCoursesFilterListChange }>
            </TagFilterSelector>
            <TagFilterSelector
                options={Object.keys(tagsAndCourses.tags)}
                selectName="FilterTagDropdown"
                labelText="By Tag:"
                onFilterListChange={onTagsFilterListChange}>
            </TagFilterSelector>
            <button
                className="btn btn-primary"
                onClick={() => onFilterButtonClick(filterBody)}>
                Filter
            </button>
        </div>
    )
}

export default QuestionFilter
